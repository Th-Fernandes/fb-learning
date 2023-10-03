import { db } from "@/lib/firebase";
import {addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const product = await req.json();

  try {
    postProduct(product);
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({ message: "hello world" });
}

async function postProduct(product: unknown) {
  const ref = collection(db, "products");
  await addDoc(ref, product);
}
