import { realtimeDb } from "@/lib/firebase";
import { DataSnapshot, onValue, push, ref, remove, set } from "firebase/database";
import React from "react";

interface Product {
  name: string;
  value: number;
  amount: number
}

export function useRealTime() {
  const [items, setItems] = React.useState<[string, Product][]>();

  /* this is how a new data is written on cloud server. when it is
  done successfully, the other users get noticed about te changing on
  the collenction  */
  function writeUserData(userId:string, product:Product) {
    const productRef = ref(realtimeDb, `products/`)

    /* both push and set send a new obj to db. The major difference is that
     push creates a random id to refer to the doc while set need an pre-made id*/
    push(productRef, { ...product, ownerId: userId })
    // set(productRef, { ...product, ownerId: userId });
  }

  /*
    it keeps track on changes in the ref (itemsRef). When an item is
    added, updated or removed it causes to execute the callback func 
    (2th argument of onValue func). It must be used as side effect
  */
  function observeDbChanges() {
    const itemsRef = ref(realtimeDb, 'products/');
    setObserver();
    
    function setObserver() {
      onValue(itemsRef, snapshot => {
        const items = getItemsFromSnapshot(snapshot)
        setItems(items)
      });
    }

    function getItemsFromSnapshot(snapshot: DataSnapshot) {
      const items:[string, Product][] = Object.entries(snapshot.val());
      return items;
    }
  }

  function deleteItem(key:string) {
    const itemRef = ref(realtimeDb, `products/${key}`) 
    remove(itemRef)
  }

  return {
    writeUserData,
    products: items,
    observeDbChanges,
    deleteItem
  }
} 