import {app} from "./index.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc ,doc,  deleteDoc } from "firebase/firestore";

export function crud() {
  const db = getFirestore(app);

  async function create({collectionName, productName, value, isAvailable }) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        productName,
        value,
        isAvailable
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function read(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items = querySnapshot.docs.map(docs => docs.data())

    console.log('test', querySnapshot.metadata)
    return items;
  }

  async function update(collectionName, item) {
    const ref = doc(db, 'products', 'OzLm9LpozujLs8uQyiv2')
    await updateDoc(ref, {
      isAvailable: false
    });
  }

  async function remove(collectionName, id) {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch(e) {
      console.error(e)
    }
  }

  return {
    create,
    read,
    update,
    remove
  }
}

export class crud2 {
  #db = getFirestore(app);

   async create({collectionName, productName, value, isAvailable }) {
    try {
      const docRef = await addDoc(collection(this.#db, collectionName), {
        productName,
        value,
        isAvailable
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}