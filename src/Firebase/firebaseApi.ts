import {
  createUserWithEmailAndPassword,
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
} from "firebase/firestore";
import {
  addBooking,
  addVisitor,
  setBookings,
  setSpaces,
  setUser,
  setUserState,
  setVisits,
} from "../Redux/Actions";
import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { auth, db } from "./firebaseConfig";

const usersDBRef = (condominiumId: string) => {
  return `condominiums/${condominiumId}/users`;
};
const spacesCollectionRef = "condominiums/q4CPmR9IIHrA6k1H2SdS/spaces";
const bookingsCollectionRef = "condominiums/q4CPmR9IIHrA6k1H2SdS/bookings";
const visitorsCollectionRef = "condominiums/q4CPmR9IIHrA6k1H2SdS/visitors";

//export const getBookingsCollection = getDocs(query(collection(db, bookingsCollection),where('userId','==','alfa'), orderBy("dateStart"), limit(5)))

export const getSpaces = async (dispatch: any) => {
  const snapshot = await getDocs(collection(db, spacesCollectionRef));

  const newSpaces: space[] = [];

  snapshot.forEach((space: any) => {
    newSpaces.push({ ...space.data(), id: space.id });
  });

  await dispatch(setSpaces(newSpaces));
};

//Visits async functions

export const getVisits = async (dispatch: any) => {
  const snapshot = await getDocs(collection(db, visitorsCollectionRef));

  const newVisits: visitor[] = [];

  snapshot.forEach((visitor: any) => {
    newVisits.push({ ...visitor.data() });
  });

  await dispatch(setVisits(newVisits));
};

export const uploadVisitor = async (visitor: visitor, dispatch: any) => {
  try {
    const docRef = await addDoc(collection(db, visitorsCollectionRef), visitor);

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const updateVisitor: visitor = { ...visitor, id: docRef.id };

    await dispatch(addVisitor(updateVisitor));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//Booking async functions

export const getBookings = async (dispatch: any) => {
  const snapshot = await getDocs(collection(db, bookingsCollectionRef));

  const newBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    newBookings.push({ ...booking.data() });
  });

  await dispatch(setBookings(newBookings));
};

export const uploadBooking = async (booking: booking, dispatch: any) => {
  try {
    const docRef = await addDoc(collection(db, bookingsCollectionRef), booking);

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const updateBooking: booking = { ...booking, id: docRef.id };

    await dispatch(addBooking(updateBooking));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//User async functions

export const validateUserInDB = async (
  id: string,
  condominium: string,
  dispatch: any
) => {
  const docSnap = await getDoc(doc(db, usersDBRef(condominium), id));

  if (docSnap.exists()) {
    const user: User = {
      firstname: docSnap.data().firstname,
      lastname: docSnap.data().lastname,
      condominiumId: docSnap.data().condominiumId,
      apartment: docSnap.data().apartment,
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
  navigate: any,
  dispatch: any
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      updateProfile(user, {
        displayName: "1111",
      }).then(async () => {
        await dispatch(setUserState(true));

        navigate("/Inicio");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const loginUser = (
  email: string,
  password: string,
  condominium: string,
  navigate: any,
  dispatch: any
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

      const docSnap = await getDoc(
        doc(db, usersDBRef(condominium), user.displayName!)
      );

      const userData: User = {
        firstname: docSnap.data()!.firstname,
        lastname: docSnap.data()!.lastname,
        condominiumId: docSnap.data()!.condominiumId,
        apartment: docSnap.data()!.apartment,
        id: docSnap.data()!.id,
      };

      await dispatch(setUser(userData));
      await dispatch(setUserState(true));

      navigate("/Inicio");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const validateUserState = (navigate: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
    } else {
      // User is signed out
      navigate("/");
    }
  });
};
