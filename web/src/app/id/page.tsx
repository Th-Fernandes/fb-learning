import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
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
            <Image
              src="https://media.sketchfab.com/models/6443cf39cf2e464b9dd28394701805eb/thumbnails/ff76a505bdf040a783a1da47f7e8b189/d03da660b3964b3e800a492d9e4a5065.jpeg"  
              alt=""
              width={1920}
              height={1080}
            />          
          </li>
        ))
      }
    </ul>
  )
}

