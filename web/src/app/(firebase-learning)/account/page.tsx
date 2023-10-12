'use client'

import { auth } from "@/lib/firebase";
import { Auth } from "@/utils/auth/email/signUp"
import { User } from "firebase/auth";
import React from "react";

interface UserInput {
  email: string;
  password: string
}

export default function AuthPage() {
  React.useEffect(() => {
    const setSignedInUserOnState = (user: User) => setSignedInUser(user)
    Auth().getSignedInUser(setSignedInUserOnState)
  }, [])

  const [userCredentials, setUserCredentials ] = React.useState<UserInput>({
    email: '',
    password: ''
  })
  const [signedInUser, setSignedInUser] = React.useState<User | null>()
  
  function handleGetInputs(property: string, value: string) {
    setUserCredentials(credentials => {
      return {
        ...credentials,
        [property]: value
      }
    })
  }

  async function handleSignUp(){
    const { email, password } = userCredentials
    await Auth().signUp({email, password})
    console.log('user signed-up')
  }

  async function handleSignIn() {
    const { email,password } = userCredentials;
    const user = await Auth().signIn({email, password}) 
    setSignedInUser(user)
  }

  async function handleSignOut() {
    await Auth().signOut()
    setSignedInUser(null)
  }

  return (
    <main className="flex items-center justify-center flex-col gap-24 h-screen">
      {
        signedInUser ? (
          <div>
            <h1>nome: {signedInUser.displayName || 'não informado'}</h1>
            <p>email: {signedInUser.email || 'não informado'}</p>
            <p>celular: {signedInUser.phoneNumber || 'não informado'}</p>

            <button onClick={handleSignOut} className=" border border-red-500 p-1 rounded text-red-400 hover:bg-red-400 hover:text-white transition-colors">
              sign out
            </button>
          </div>
        )
        : <span>Nenhum usuário logado</span>
      }

      <form onSubmit={el => el.preventDefault()}>
        <div className="mb-4">
          <label className="block" htmlFor="signEmail">Email</label>
          <input type="text"  id="signEmail" name="email" onChange={el => handleGetInputs(el.target.name, el.target.value)}/>
        </div>
        <div>
          <label className="block" htmlFor="signPassword">Password</label>
          <input type="password" id="signPassword"  name="password" onChange={el => handleGetInputs(el.target.name, el.target.value)}/>
        </div>

        <ul className=" flex gap-4 mt-6">
          <li>
            <button className="bg-orange-300 p-1 rounded" onClick={handleSignUp}>
              fazer signUp
            </button>
          </li>
          <li>
            <button className="bg-cyan-300 p-1 rounded" onClick={handleSignIn}>
              fazer signIn
            </button>
          </li>
        </ul>
      </form>
    </main>
  )
}