'use client'

import { auth, realtimeDb } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { useRealTime } from "./useRealTime";

interface Product {
  name: string;
  value: number;
  amount: number
}

export default function Page() {
  const { writeUserData, products, observeDbChanges, deleteItem } = useRealTime();
  const [userInput, setUserInput] = React.useState<Product>({
    name: '',
    value: 0,
    amount: 0,
  })

  function handleGetInputs(property: string, value: string) {
    setUserInput(inputs => {
      return {
        ...inputs,
        [property]: value
      }
    })
  }

  function handleSubmit() {
    const {name, amount, value } = userInput
    
    onAuthStateChanged(auth, user => {
      const hasUser = user !== null
  
      if(hasUser)
        writeUserData(user.uid, {
          name,
          value: Number(value),
          amount: Number(amount)
        })
    })  
  }

  React.useEffect(() => observeDbChanges() , [])

  return (
    <main>
      <form onSubmit={event => {
        event.preventDefault()
        handleSubmit()
      }} className="flex flex-col gap-4 items-center p-6">
        <legend className="text-2xl">add new product</legend>

        <div>
          <label className="block" htmlFor="">name</label>
          <input className="text-black rounded-lg p-1" type="text" name="name" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>
        <div>
          <label className="block" htmlFor="">value</label>
          <input className="text-black rounded-lg p-1" type="number" name="value" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>
        <div>
          <label className="block" htmlFor="">in stock</label>
          <input className="text-black rounded-lg p-1" type="text" name="amount" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>

        <button type="submit" className="bg-purple-500 w-[224px] p-1 rounded-lg"> submit</button>
      </form>

      <ul className="flex gap-6 justify-center">
        {
          products && products.map((product) => (
            <li key={product[0]} className="m-4" >
              <p>name: {product[1].name}</p>
              <p>value: {product[1].value}</p>
              <p>on stock: {product[1].amount}</p>
              <button 
                className="p-1 border border-red-400 text-red-400" 
                onClick={() => deleteItem(product[0])}>delete item</button>
            </li>
          ))
        }
      </ul>
    </main>
  )
}