import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import {  useNavigate } from "react-router-dom";
export const add = async (obj, ref,setId,navigate) => {
  // const navigate = useNavigate()
  try {
    // const userId = auth?.currentUser?.uid;
    const dataBaseRef = collection(db, ref);
    await addDoc(dataBaseRef, obj).then((docRef) => {
      const docId = docRef.id;
      
      setId(docId)
      
      navigate('/pdf', { state: { ...obj,DocId:docId} });
    });
  } catch (err) {
    
  }
};

export function hasEmptyInputs(values) {
  
  return Object.values(values).some((value) => value.trim() === "");
}
export const checkDataBase = async (ref, id, setStarred) => {
  const collectionRef = collection(db, ref);
  let q = await query(collectionRef, where("doc", "==", id))
  const a = await getDocs(q)
  

  await getDocs(a)
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        setStarred(true);
        
      } else {
        setStarred(false);
        
      }
    })
    .catch((error) => {
      
    });
};
export const deleteDocFromDb = async (ref, code, setStarred) => {
  const documentRef = doc(db, ref, code);

  try {
    await deleteDoc(documentRef);
    setStarred(false);
  } catch (err) {
    
  }
};

export const fetchSingleData = async (id) => {
  const single = await query(
    collection(db, "starredInvoice"),
    where("DocId", "==", id)
  );
  const singleSnapshot = await getDocs(single);
  const fetchedSingleData = await singleSnapshot.docs.map((doc) => ({
    ...doc.data(),
    DocId: doc.id,
  }));
  // 

  return fetchedSingleData;

  /////////fetch single doc from db
};

export const fetchdata = async (from, docName, setData) => {
  try {
    const q = await query(
      collection(db, from),
      where(docName, "==", auth?.currentUser?.uid)
    );

    const querySnapshot = await getDocs(q);

    const fetchedData = await querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      DocId: doc.id,
    }));
    setData(fetchedData);
  } catch (err) {
    
  }
};
