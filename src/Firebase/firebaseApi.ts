import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const spacesCollection = "condominiums/q4CPmR9IIHrA6k1H2SdS/spaces"

export const getSpacesCollection = getDocs(collection(db, spacesCollection))

export const getSpaceData = (id: string) => { return getDoc(doc(db, `condominiums/q4CPmR9IIHrA6k1H2SdS/spaces/${id}`))} 