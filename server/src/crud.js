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
    const items = querySnapshot.docs.map(docs => {
      return { id: docs.id, ...docs.data() }
    })
    return items;
  }

  async function update(collectionName, itemId) {
    const ref = doc(db, collectionName, itemId)
    await updateDoc(ref, {
      value: 299.95
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

export class StoreManagment {
  async Post({productName, value, isAvailable}) {
    const t = new Post().onCollection('products')
    t.publishDocument({
      productName, 
      value, 
      isAvailable
    }) 
  }
}

class Post {
  #db = getFirestore(app);
  #collection = '';

  onCollection(collection) {
    this.#collection = collection
  }

  async publishDocument({productName, value, isAvailable}) {
    try {
      const docRef = await addDoc(collection(this.#db, this.#collection), {
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