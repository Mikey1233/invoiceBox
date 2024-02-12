import { addDoc, collection } from "firebase/firestore";
import { db,auth } from "../config/firebaseConfig";
export const add = async (
    obj
) => {
  try {
    const userId = auth?.currentUser?.uid
    const dataBaseRef = collection(db, "invoice");
    await addDoc(dataBaseRef, obj)
  } catch (err) {
    console.log(err);
  }
};

export function hasEmptyInputs(values) {
  console.log('hey')
    return Object.values(values).some((value) => value.trim() === "");
  }