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
  setVisits,
} from "../Redux/Actions";
import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { visitor } from "../Types/visitor";
import { db } from "./firebaseConfig";

const usersDBRef = collection(db, "usersDB");
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

export const getBookings = async (dispatch: any) => {
  const snapshot = await getDocs(collection(db, bookingsCollectionRef));

  const newBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    newBookings.push({ ...booking.data() });
  });

  await dispatch(setBookings(newBookings));
};

export const getVisits = async (dispatch: any) => {
  const snapshot = await getDocs(collection(db, visitorsCollectionRef));

  const newVisits: visitor[] = [];

  snapshot.forEach((visitor: any) => {
    newVisits.push({ ...visitor.data() });
  });

  await dispatch(setVisits(newVisits));
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

export const findUserInDB = async (id: string) => {
  const q = await query(usersDBRef, where("id", "==", id));

  console.log(q.firestore);
};
