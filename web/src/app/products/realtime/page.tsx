'use client'

import { realtimeDb } from "@/lib/firebase";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";

interface Product {
  name: string;
  value: number;
  amount: number
}

export default function Page() {
  const [products, setProducts] = React.useState<Product[]>()
  const [userInput, setUserInput] = React.useState<Product>({
    name: '',
    value: 0,
    amount: 0,
  })

  function writeUserData(userId:string, {name, value, amount}:Product) {
    set(ref(realtimeDb, 'products/' + userId), {
      name,
      value,
      amount
    });
  }

  useEffect(() => {
    const starCountRef = ref(realtimeDb, 'products/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const items: Product[] = Object.values(data);
      setProducts(items)
    });
  }, [])

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

    writeUserData('F21q8yjsxITluvHwZfUNyid8dg22', {
        name,
        value: Number(value),
        amount: Number(amount)
      })
  }

  // writeUserData('F21q8yjsxITluvHwZfUNyid8dg22', {
  //   name: 'blue t-shirt',
  //   value: 99.90,
  //   amount: 23
  // })
  return (
    <main>
      <form onSubmit={event => {
        event.preventDefault()
        handleSubmit()
      }} className="flex flex-col gap-4">
        <legend>add new product</legend>

        <div>
          <label htmlFor="">name</label>
          <input type="text" name="name" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>
        <div>
          <label htmlFor="">value</label>
          <input type="number" name="value" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>
        <div>
          <label htmlFor="">on stock</label>
          <input type="text" name="amount" onChange={el => handleGetInputs(el.target.name, el.target.value)} />
        </div>

        <button type="submit"> submit</button>
      </form>

      <ul>
        {
          products && products.map(product => (
            <li key={product.name + product.value} className="m-4">
              <p>name: {product.name}</p>
              <p>value: {product.value}</p>
              <p>on stock: {product.amount}</p>
            </li>
          ))
        }
      </ul>
    </main>
  )
}