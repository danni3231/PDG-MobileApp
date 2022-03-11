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
import { db } from "./firebaseConfig";

const spacesCollection = "condominiums/q4CPmR9IIHrA6k1H2SdS/spaces";
const bookingsCollection = "condominiums/q4CPmR9IIHrA6k1H2SdS/bookings";

export const getSpacesCollection = getDocs(collection(db, spacesCollection))
//export const getBookingsCollection = getDocs(query(collection(db, bookingsCollection),where('userId','==','alfa'), orderBy("dateStart"), limit(5)))

export const getBookingsCollection = getDocs(collection(db, bookingsCollection))

export const getSpaceData = (id: string) => { return getDoc(doc(db, `condominiums/q4CPmR9IIHrA6k1H2SdS/spaces/${id}`))} 