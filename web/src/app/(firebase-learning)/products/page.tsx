"use client"

import { useGetProducts } from "@/hooks/useGetProducts";
import { Auth } from "@/utils/auth/email/signUp";
import { User } from "firebase/auth";
import React from "react";

export default function ProductsPage() {
  const [signedInUser, setSignedInUser] = React.useState<User>();

  React.useEffect(() => {
    Auth().getSignedInUser((user:User) => {
      setSignedInUser(user)
      console.log('products page', user)
    })
  }, [])
  const products = useGetProducts();
  
  return (
    <ul>
      {
        products && products.map(product => (
          <li key={product.id}>{product.productName}</li>
        ))
      }
      {signedInUser && signedInUser.email}
      </ul> 
  )
}