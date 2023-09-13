import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

const getItem = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const items = querySnapshot.docs.map(docs => {
    const { value, isAvailable, productName } = docs.data()

    const products = {
      id: docs.id, value, isAvailable, productName
    } 

    return products
  })
  return items;
}

export default async function DeleteMe() {
  const products = await getItem();
  console.log(products)
  
  return (
    <ul>
      {
        products && products.map(({productName }) => (
          <li key={productName}>
            {productName}
          </li>
        ))
      }
    </ul>
  )
}

