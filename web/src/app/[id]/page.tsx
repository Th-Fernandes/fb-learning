import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

interface Product {
  value: number;
  isAvailable: boolean;
  productName: string;
}

const getItem = cache(async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const items = querySnapshot.docs.map(docs => {
    const { value, isAvailable, productName } = docs.data();
    
    return  {
      id: docs.id, value, isAvailable, productName
    } 
  })
  return items;
})


export default async function ProductsPage() {
  /* 
    FETCHING STRATEGIES
    - The first one is the server components standard approach. with this you can call helper funcs directly
    - the second one uses the route handlers approach which consists on create an endpoint and perform a HTTP method on it
   */

  // const products = await getItem();
  // console.log(products)

  const productsQuery = await fetch(process.env.HOST + '/api/products', { method: 'GET'})
  const products = await productsQuery.json()
  
  return (
      <ul>
      {
        products && products.map(({productName, value }: Product) => (
          <li key={productName} className="border-b-2 p-1 border-b-orange-600 flex flex-col gap-2">
            <span>name: {productName}</span> 
            <span>price: {value} </span>            
          </li>
        ))
      }
    </ul>
  )
}

