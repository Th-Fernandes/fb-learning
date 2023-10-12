'use client'

import React from "react"

export default function AdminDashBoard() {
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  
  return (
    <dialog 
      open={isOpen} 
      className="w-1/2 h-screen inset-0 "
    >
      <small onClick={() => setIsOpen(false)} className="cursor-pointer">close</small>
      <h2>hello world :)</h2>
      <p>just giving it a try</p>

    </dialog>
  )
}