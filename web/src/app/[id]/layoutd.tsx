import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

const getItem = cache(async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const items = querySnapshot.docs.map(docs => {
    const { value, isAvailable, productName } = docs.data()

    const products = {
      id: docs.id, value, isAvailable, productName
    } 

    return products
  })
  return items;
})

export default async function Layout({
  params: { id },
  children,
}: {
  children: React.ReactNode,
  params: { id: string}
}) {
  console.log('test: ', id)
  console.log(await getItem());

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
