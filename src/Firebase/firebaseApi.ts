import { async } from "@firebase/util";
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
import { booking } from "../Types/booking";
import { db } from "./firebaseConfig";

const spacesCollectionRef = "condominiums/q4CPmR9IIHrA6k1H2SdS/spaces";
const bookingsCollectionRef = "condominiums/q4CPmR9IIHrA6k1H2SdS/bookings";

export const getSpacesCollection = getDocs(collection(db, spacesCollectionRef))
//export const getBookingsCollection = getDocs(query(collection(db, bookingsCollection),where('userId','==','alfa'), orderBy("dateStart"), limit(5)))

export const getBookingsCollection = getDocs(collection(db, bookingsCollectionRef))

export const getSpaceData = (id: string) => { return getDoc(doc(db, `condominiums/q4CPmR9IIHrA6k1H2SdS/spaces/${id}`))} 

export const uploadBooking = async (booking: booking) => {
  try {
    const docRef = await addDoc(collection(db, bookingsCollectionRef),booking);

    await updateDoc(docRef,{
      id: docRef.id
    })

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}