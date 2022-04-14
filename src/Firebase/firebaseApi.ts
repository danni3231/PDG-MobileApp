import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
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
  addVisitor,
  setBookings,
  setNews,
  setSpaces,
  setUser,
  setUsers,
  setUserState,
  setVisits,
} from "../Redux/Actions";
import { booking } from "../Types/booking";
import { news } from "../Types/news";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { auth, db } from "./firebaseConfig";

const relationBranchRef = "relationBranch";

const usersCollectionRef = (condominiumId: string) => {
  return `condominiums/${condominiumId}/users`;
};

const noticesCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/notices`;

const spacesCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/spaces`;

const bookingsCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/bookings`;

const visitorsCollectionRef = (condominiumId: string) =>
  `condominiums/${condominiumId}/visitors`;

//export const getBookingsCollection = getDocs(query(collection(db, bookingsCollection),where('userId','==','alfa'), orderBy("dateStart"), limit(5)))

export const getSpaces = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, spacesCollectionRef(condominiumId))
  );

  console.log(snapshot);

  const newSpaces: space[] = [];

  snapshot.forEach((space: any) => {
    newSpaces.push({ ...space.data(), id: space.id });
  });

  await dispatch(setSpaces(newSpaces));
};

// * Visits async functions

export const getVisits = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, visitorsCollectionRef(condominiumId))
  );

  const newVisits: visitor[] = [];

  snapshot.forEach((visitor: any) => {
    newVisits.push({ ...visitor.data() });
  });

  await dispatch(setVisits(newVisits));
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

export const getBookings = async (condominiumId: string, dispatch: any) => {
  const snapshot = await getDocs(
    collection(db, bookingsCollectionRef(condominiumId))
  );

  const newBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    newBookings.push({ ...booking.data() });
  });

  await dispatch(setBookings(newBookings));
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

  await dispatch(setNews(newNews));
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
    }
    newUsers.push({ ...notice.data() });
  });

  await dispatch(setUsers(newUsers));
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
  navigate: any,
  dispatch: any
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;

      await dispatch(setUserState(true));
      await getSpaces(condominiumId, dispatch);
      await getBookings(condominiumId, dispatch);
      await getVisits(condominiumId, dispatch);
      await getNews(condominiumId, dispatch);
      await getUsers(condominiumId, id, dispatch);

      createRelationBranch(id, condominiumId, user.uid).then(() => {
        navigate("/Inicio");
      });
    }
  );
};

export const loginUser = (
  email: string,
  password: string,
  navigate: any,
  dispatch: any
) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

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

      await dispatch(setUser(userData));
      await dispatch(setUserState(true));
      await getSpaces(userData.condominiumId, dispatch);
      await getBookings(userData.condominiumId, dispatch);
      await getVisits(userData.condominiumId, dispatch);
      await getNews(userData.condominiumId, dispatch);
      await getUsers(userData.condominiumId, userData.id, dispatch);

      navigate("/Inicio");
    }
  );
};

export const validateUserState = (
  location: string,
  navigate: any,
  dispatch: any
) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
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

      await dispatch(setUser(userData));
      await dispatch(setUserState(true));
      await getSpaces(userData.condominiumId, dispatch);
      await getBookings(userData.condominiumId, dispatch);
      await getVisits(userData.condominiumId, dispatch);
      await getNews(userData.condominiumId, dispatch);
      await getUsers(userData.condominiumId, userData.id, dispatch);

      if (location === "/" || location === "/Registro") {
        navigate("/Inicio");
      }
    } else {
      // User is signed out
      navigate("/");
    }
  });
};
