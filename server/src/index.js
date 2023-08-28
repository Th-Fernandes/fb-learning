import { initializeApp } from "firebase/app";
import { crud } from "./crud.js";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl9wECzyf9VqzYCPXNp6WEJdQGjGXJxFQ",
  authDomain: "fir-learning-69147.firebaseapp.com",
  projectId: "fir-learning-69147",
  storageBucket: "fir-learning-69147.appspot.com",
  messagingSenderId: "674684015221",
  appId: "1:674684015221:web:7e9fb8efbe6d4d52da9e3c",
  measurementId: "G-6R9XH16VJV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const products = await crud().read('products');
console.log('first product: ', products[0])

const updateProduct = await crud().update('products', products[0].id);

await crud().remove('products', products[1].id)