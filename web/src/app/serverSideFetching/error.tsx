'use client';

import { useRouter } from "next/navigation";

export default function Error({
  error, reset
}:{
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();
  const redirectToMainMenu = () => router.push('/')


  return (
    <div>
      <p>something went wrong :( sorry ;-;</p>
      <p>{error.message}</p>
      <button>try again</button>
      <button>go back to main menu</button>
    </div>
  )
}