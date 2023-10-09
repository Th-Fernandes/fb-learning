import { cookies } from "next/headers";

export function GET() {
  const cookieStore = cookies();
  cookieStore.set('')
}