'use client';

export default function Error({
  error, reset
}:{
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div>
      <p>something went wrong :( sorry ;-;</p>
      <p>{error.message}</p>
    </div>
  )
}