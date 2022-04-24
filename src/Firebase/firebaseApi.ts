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
} from "firebase/firestore";
import {
  addBooking,
  addChat,
  addMessage,
  addVisitor,
  editVisit,
  setBookings,
  setNews,
  setSpaces,
  setUser,
  setUsers,
  setUserState,
  setVisits,
} from "../Redux/Actions";
import { booking } from "../Types/booking";
import { message } from "../Types/message";
import { news } from "../Types/news";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { auth, db } from "./firebaseConfig";

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

const chatsCollectionRef = `chats`;

const messagesCollectionRef = (chatId: string) => `chats/${chatId}/messages`;

//export const getBookingsCollection = getDocs(query(collection(db, bookingsCollection),where('userId','==','alfa'), orderBy("dateStart"), limit(5)))

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
    where("userId", "==", userId)
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
    where("userId", "==", userId)
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

      listenChats(userData.id, dispatch);

      if (location === "/" || location === "/Registro") {
        navigate("/Inicio");
      }
    } else {
      // User is signed out
      navigate("/");
    }
  });
};

export const logout = async (navigate: any) => {
  const auth = await getAuth();
  signOut(auth).then(() => {
    navigate("/");
  });
};

export const createUser = async (newUser: User) => {
  await setDoc(
    doc(db, usersCollectionRef(newUser.condominiumId), newUser.id),
    newUser
  );
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
