'use client';

import { useGetProducts } from "@/hooks/useGetProducts";
import { googleAuth } from "@/utils/auth/google/signin_popup";
import { User } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import Image from "next/image";
import React from "react";

export default function Home() {
  const products = useGetProducts();
  const [loggedInUser, setLoggedInUser] = React.useState<User | null>()

  async function handleGoogleLogin() {
    const signIn = await googleAuth().SignIn()

    if(signIn) setLoggedInUser(signIn)
  }

  async function handleSignOut() {
    await googleAuth().SignOut()
    setLoggedInUser(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <button className="h-8 bg-white" onClick={handleGoogleLogin}>login with google</button>
      <button onClick={handleSignOut}>SIGN OUT</button>

      <div className="flex items-center flex-col">
        {
          loggedInUser ? (
            <>
              <Image
                className="rounded-full"
                alt=""
                src={ typeof loggedInUser?.photoURL === 'string'  ? loggedInUser?.photoURL : ''}
                width={64}
                height={64}
              />

              <div>
              {loggedInUser && loggedInUser.displayName}
            </div>
            <div>
              {loggedInUser && loggedInUser.email}
            </div>
            {loggedInUser && loggedInUser.phoneNumber}
            </>
          ) : <span>no user logged in. Please select a provider</span>
        }
        
        
      </div>

      {/* <ul>
        {
          products && products.map(product => (
            <li key={product.id}>{product.productName}</li>
          ))
        }
      </ul> */}
    </main>
  )
}
