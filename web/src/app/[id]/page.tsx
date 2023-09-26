import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const getItem = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const items = querySnapshot.docs.map(docs => {
    const { value, isAvailable, productName } = docs.data();
    
    return  {
      id: docs.id, value, isAvailable, productName
    } 
  })
  return items;
}


export default async function ProductsPage() {
  const products = await getItem();
  // console.log(products)
  
  return (
      <ul>
      {
        products && products.map(({productName }) => (
          <li key={productName}>
            <Image
              src="https://media.sketchfab.com/models/6443cf39cf2e464b9dd28394701805eb/thumbnails/ff76a505bdf040a783a1da47f7e8b189/d03da660b3964b3e800a492d9e4a5065.jpeg"  
              alt=""
              width={1920}
              height={1080}
            />
            {productName}
          </li>
        ))
      }
    </ul>
  )
}

