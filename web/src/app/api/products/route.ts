import { db } from "@/lib/firebase";
import {addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const ref = collection(db, "products");
  const querySnapshot = await getDocs(ref);
  const items = querySnapshot.docs.map(docs => {
    return { id: docs.id, ...docs.data() }
  })

  return NextResponse.json(items);
}

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
