

import {db} from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore";
import React from 'react';

interface Product {
  id: string;
  value: number;
  isAvailable: boolean;
  productName: string
}

export function useGetProducts() {
  const [products, setProducts] = React.useState<Product[]>();

  React.useEffect(() => {
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(docs => {
        const products: Product = {
          id: docs.id,
          value: docs.data().value,
          isAvailable: docs.data().isAvailable,
          productName: docs.data().productName
        } 
        return products
      })
      return items;
    }
    
    async function t() {
      const products = await getProducts()
      setProducts(products);
    }
    t()
  }, [])

  return products;
}