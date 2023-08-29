'use client';

import { useGetProducts } from "@/hooks/useGetProducts";
import { provider } from "@/utils/auth/google/auth_create";
import { googleAuth } from "@/utils/auth/google/signin_popup";
import { getAuth, signInWithRedirect, signInWithPopup, User } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import React from "react";

export default function Home() {
  const products = useGetProducts();
  const [loggedInUser, setLoggedInUser] = React.useState<User>()

  async function handleLogin() {
    const signIn = await googleAuth().SignIn()

    if(signIn) setLoggedInUser(signIn)
  }

  async function handleSignOut() {
    const signOut = await googleAuth().SignOut()
    console.log(signOut)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <button className="h-8 bg-white" onClick={handleLogin}>login with google</button>
      <button onClick={handleSignOut}>SIGN OUT</button>

      <div>
        {loggedInUser && loggedInUser.displayName}
        {loggedInUser && loggedInUser.email}
        {loggedInUser && loggedInUser.phoneNumber}
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
