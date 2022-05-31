import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  limit,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addBooking,
  addChat,
  addMessage,
  addNews,
  addPqr,
  addSpace,
  addVisitor,
  deleteBooking,
  deleteVisit,
  editBooking,
  editVisit,
  removeChats,
  setAllBookings,
  setAllPqrs,
  setAllVisits,
  setBookings,
  setNews,
  setPqrs,
  setSpaces,
  setUser,
  setUsers,
  setUserState,
  setVisits,
  updateCurrentUser,
} from "../Redux/Actions";
import { booking } from "../Types/booking";
import { message } from "../Types/message";
import { news } from "../Types/news";
import { pqr } from "../Types/pqr";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { auth, db, storage } from "./firebaseConfig";

//firestore refs

const relationBranchRef = "relationBranch";

const usersCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/users`;

const noticesCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/notices`;

const spacesCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/spaces`;

const bookingsCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/bookings`;

const visitorsCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/visitors`;

const pqrsCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/pqrs`;

const chatsCollectionRef = `chats`;

const messagesCollectionRef = (chatId: string) => `chats/${chatId}/messages`;

// * Storage refs

const pqrRef = (condominiumId: string, name: string) =>
  ref(storage, `${condominiumId}/pqr/${name}`);

const userPhotoRef = (condominiumId: string, userId: string) =>
  ref(storage, `${condominiumId}/users/${userId}/profile`);

const spaceRef = (condominiumId: string, name: string) =>
  ref(storage, `${condominiumId}/space/${name}`);

const noticeRef = (condominiumId: string, name: string) =>
  ref(storage, `${condominiumId}/notices/${name}`);

export const getSpaces = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, spacesCollectionRef(condominiumId))
  );

  const newSpaces: space[] = [];

  snapshot.forEach((space: any) => {
    newSpaces.push({ ...space.data(), id: space.id });
  });

  dispatch(setSpaces(newSpaces));
};

// * Visits async functions

const visitsQuery = (condominiumId: string, userId: string) =>
  query(
    collection(db, visitorsCollectionRef(condominiumId)),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );

const getVisits = async (
  condominiumId: string,
  userId: string,
  dispatch: any
) => {
  const snapshot = await getDocs(visitsQuery(condominiumId, userId));

  const newVisits: visitor[] = [];

  snapshot.forEach((visitor: any) => {
    newVisits.push({ ...visitor.data() });
  });

  dispatch(setVisits(newVisits));
};

export const updateVisit = async (
  visitor: visitor,
  condominiumId: string,
  dispatch: any
) => {
  const visitDocRef = doc(db, visitorsCollectionRef(condominiumId), visitor.id);

  await updateDoc(visitDocRef, visitor);

  dispatch(editVisit(visitor));
};

export const removeVisit = async (
  visitorId: string,
  condominiumId: string,
  dispatch: any
) => {
  await deleteDoc(doc(db, visitorsCollectionRef(condominiumId), visitorId));

  dispatch(deleteVisit(visitorId));
};

export const uploadVisitor = async (
  visitor: visitor,
  condominiumId: string,
  dispatch: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, visitorsCollectionRef(condominiumId)),
      visitor
    );

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const updateVisitor: visitor = { ...visitor, id: docRef.id };

    await dispatch(addVisitor(updateVisitor));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// * Booking async functions

const bookingQuery = (condominiumId: string, userId: string) =>
  query(
    collection(db, bookingsCollectionRef(condominiumId)),
    where("userId", "==", userId),
    orderBy("dateStart", "desc")
  );

const getBookings = async (
  condominiumId: string,
  userId: string,
  dispatch: any
) => {
  const snapshot = await getDocs(bookingQuery(condominiumId, userId));

  const newBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    newBookings.push({ ...booking.data() });
  });

  dispatch(setBookings(newBookings));
};

export const updateBooking = async (
  booking: booking,
  condominiumId: string,
  dispatch: any
) => {
  const bookingDocRef = doc(
    db,
    bookingsCollectionRef(condominiumId),
    booking.id
  );

  await updateDoc(bookingDocRef, booking);

  dispatch(editBooking(booking));
};

export const removeBooking = async (
  bookingId: string,
  condominiumId: string,
  dispatch: any
) => {
  await deleteDoc(doc(db, bookingsCollectionRef(condominiumId), bookingId));

  dispatch(deleteBooking(bookingId));
};

export const uploadBooking = async (
  booking: booking,
  condominiumId: string,
  dispatch: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, bookingsCollectionRef(condominiumId)),
      booking
    );

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const updateBooking: booking = { ...booking, id: docRef.id };

    await dispatch(addBooking(updateBooking));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// * news async functions

export const getNews = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, noticesCollectionRef(condominiumId))
  );

  const newNews: news[] = [];

  snapshot.forEach((notice: any) => {
    newNews.push({ ...notice.data() });
  });

  dispatch(setNews(newNews));
};

// * User async functions

const createRelationBranch = (
  id: string,
  condominiumId: string,
  uid: string
) => {
  const relationBranch = {
    id: id,
    condominiumId: condominiumId,
    uid: uid,
  };

  return setDoc(doc(db, relationBranchRef, uid), relationBranch);
};

const getUsers = async (
  condominiumId: string,
  currentUserId: string,
  dispatch: any
) => {
  const snapshot = await getDocs(
    collection(db, usersCollectionRef(condominiumId))
  );

  const newUsers: User[] = [];

  snapshot.forEach((notice: any) => {
    if (notice.data().id !== currentUserId) {
      newUsers.push({ ...notice.data() });
    }
  });

  dispatch(setUsers(newUsers));
};

export const validateUserInDB = async (
  id: string,
  condominium: string,
  dispatch: any
) => {
  const docSnap = await getDoc(doc(db, usersCollectionRef(condominium), id));

  if (docSnap.exists()) {
    const user: User = {
      firstname: docSnap.data().firstname,
      lastname: docSnap.data().lastname,
      condominiumId: docSnap.data().condominiumId,
      apartment: docSnap.data().apartment,
      profileImg: docSnap.data().profileImg,
      id: docSnap.data().id,
    };

    await dispatch(setUser(user));

    return true;
  } else {
    return false;
  }
};

export const registerUser = (
  email: string,
  password: string,
  id: string,
  condominiumId: string,
  navigate: any
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;

      createRelationBranch(id, condominiumId, user.uid).then(() => {
        navigate("/Inicio");
      });
    }
  );
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const validateUserState = (
  location: string,
  navigate: any,
  dispatch: any
) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRelationSnap = await getDoc(
        doc(db, relationBranchRef, user.uid)
      );

      const userSnap = await getDoc(
        doc(
          db,
          usersCollectionRef(userRelationSnap.data()!.condominiumId),
          userRelationSnap.data()!.id
        )
      );

      const userData: User = {
        firstname: userSnap.data()!.firstname,
        lastname: userSnap.data()!.lastname,
        condominiumId: userSnap.data()!.condominiumId,
        apartment: userSnap.data()!.apartment,
        profileImg: userSnap.data()!.profileImg,
        id: userSnap.data()!.id,
      };

      dispatch(setUser(userData));
      dispatch(setUserState(true));

      getSpaces(userData.condominiumId, dispatch);
      getBookings(userData.condominiumId, userData.id, dispatch);
      getVisits(userData.condominiumId, userData.id, dispatch);
      getNews(userData.condominiumId, dispatch);
      getUsers(userData.condominiumId, userData.id, dispatch);
      getPqrs(userData.condominiumId, userData.id, dispatch);

      listenChats(userData.id, dispatch);

      if (userData.apartment === "Administrador") {
        getAllBookings(userData.condominiumId, dispatch);
        getAllPqr(userData.condominiumId, dispatch);
        getAllVisits(userData.condominiumId, dispatch);
      }

      if (location === "/" || location === "/Registro") {
        navigate("/Inicio");
      }
    } else {
      // User is signed out
      navigate("/");
    }
  });
};

export const logout = async (dispatch: any, navigate: any) => {
  const auth = await getAuth();
  signOut(auth).then(() => {
    dispatch(removeChats());
    navigate("/");
  });
};

export const createUser = async (newUser: User) => {
  await setDoc(
    doc(db, usersCollectionRef(newUser.condominiumId), newUser.id),
    newUser
  );
};

export const updateProfilePhoto = async (
  currentUser: User,
  file: File,
  dispatch: any
) => {
  await uploadBytes(
    userPhotoRef(currentUser.condominiumId, currentUser.id),
    file
  ).then(() => {
    getDownloadURL(
      userPhotoRef(currentUser.condominiumId, currentUser.id)
    ).then(async (url) => {
      try {
        await updateDoc(
          doc(
            db,
            usersCollectionRef(currentUser.condominiumId),
            currentUser.id
          ),
          {
            profileImg: url,
          }
        );

        const newCurrentUser = { ...currentUser, profileImg: url };

        await dispatch(updateCurrentUser(newCurrentUser));
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  });
};

// * Messages async functions

const chatsQuery = (userId: string) =>
  query(
    collection(db, chatsCollectionRef),
    where("users", "array-contains", userId)
  );

const messageQuery = (chatId: string) =>
  query(collection(db, messagesCollectionRef(chatId)), orderBy("sendAt"));

const listenChats = (userId: string, dispatch: any) =>
  onSnapshot(chatsQuery(userId), (chatQuerySnapshot) => {
    chatQuerySnapshot.docChanges().forEach((changeChat) => {
      if (changeChat.type === "added") {
        dispatch(
          addChat({
            users: changeChat.doc.data().users,
            id: changeChat.doc.id,
            messages: [],
          })
        );

        onSnapshot(messageQuery(changeChat.doc.id), (messageQuerySnapshot) => {
          messageQuerySnapshot.docChanges().forEach((changeMessage) => {
            if (changeMessage.type === "added") {
              const message = {
                text: changeMessage.doc.data().text,
                sendAt: changeMessage.doc.data().sendAt,
                sendBy: changeMessage.doc.data().sendBy,
              };
              dispatch(addMessage(changeChat.doc.id, message));
            }
          });
        });
      }
    });
  });

export const uploadMessage = async (chatId: string, message: message) => {
  await addDoc(collection(db, messagesCollectionRef(chatId)), message);
};

export const createChat = async (chat: any, message: message) => {
  await addDoc(collection(db, chatsCollectionRef), chat).then((chatRef) => {
    uploadMessage(chatRef.id, message);
  });
};

// * PQR async functions
/*

export const uploadFile = async (
  file: File,
  condominiumId: string,
  title: string
) => {
  return uploadBytes(pqrRef(condominiumId, title), file).then(async () => {
    await getDownloadURL(pqrRef(condominiumId, title)).then((url) => {
      url;
    });
  });
};
*/

const pqrQuery = (condominiumId: string, userId: string) =>
  query(
    collection(db, pqrsCollectionRef(condominiumId)),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );

const getPqrs = async (
  condominiumId: string,
  userId: string,
  dispatch: any
) => {
  const snapshot = await getDocs(pqrQuery(condominiumId, userId));

  const newPqrs: pqr[] = [];

  snapshot.forEach((pqr: any) => {
    newPqrs.push({ ...pqr.data() });
  });

  dispatch(setPqrs(newPqrs));
};

export const uploadPqr = async (
  pqr: pqr,
  condominiumId: string,
  dispatch: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, pqrsCollectionRef(condominiumId)),
      pqr
    );

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const updatePqr: pqr = { ...pqr, id: docRef.id };

    await dispatch(addPqr(updatePqr));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const uploadPqrWithImage = async (
  pqr: pqr,
  file: File,
  condominiumId: string,
  dispatch: any
) => {
  await uploadBytes(pqrRef(condominiumId, pqr.title), file).then(() => {
    getDownloadURL(pqrRef(condominiumId, pqr.title)).then(async (url) => {
      const newPqr: pqr = { ...pqr, img: url };

      try {
        const docRef = await addDoc(
          collection(db, pqrsCollectionRef(condominiumId)),
          newPqr
        );

        await updateDoc(docRef, {
          id: docRef.id,
        });

        const updatePqr: pqr = { ...newPqr, id: docRef.id };

        await dispatch(addPqr(updatePqr));
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  });
};

// * AdminUser

export const createSpace = async (
  space: space,
  file: File,
  condominiumId: string,
  dispatch: any
) => {
  await uploadBytes(spaceRef(condominiumId, space.name), file).then(() => {
    getDownloadURL(spaceRef(condominiumId, space.name)).then(async (url) => {
      const newSpace: space = { ...space, img: url };

      try {
        const docRef = await addDoc(
          collection(db, spacesCollectionRef(condominiumId)),
          newSpace
        );

        await updateDoc(docRef, {
          id: docRef.id,
        });

        const updateSpace: space = { ...newSpace, id: docRef.id };

        await dispatch(addSpace(updateSpace));
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  });
};

export const createNews = async (
  news: news,
  file: File,
  condominiumId: string,
  dispatch: any
) => {
  await uploadBytes(noticeRef(condominiumId, news.title), file).then(() => {
    getDownloadURL(noticeRef(condominiumId, news.title)).then(async (url) => {
      const newNotice: news = { ...news, img: url };

      try {
        const docRef = await addDoc(
          collection(db, noticesCollectionRef(condominiumId)),
          newNotice
        );

        await updateDoc(docRef, {
          id: docRef.id,
        });

        const updateNotice: news = { ...newNotice, id: docRef.id };

        await dispatch(addNews(updateNotice));
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  });
};

const getAllBookings = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, bookingsCollectionRef(condominiumId))
  );

  const allBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    allBookings.push({ ...booking.data() });
  });

  dispatch(setAllBookings(allBookings));
};

const getAllVisits = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, visitorsCollectionRef(condominiumId))
  );

  const allVisits: visitor[] = [];

  snapshot.forEach((v: any) => {
    allVisits.push({ ...v.data() });
  });

  dispatch(setAllVisits(allVisits));
};

const getAllPqr = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, pqrsCollectionRef(condominiumId))
  );

  const allPqrs: pqr[] = [];

  snapshot.forEach((p: any) => {
    allPqrs.push({ ...p.data() });
  });

  dispatch(setAllPqrs(allPqrs));
};
