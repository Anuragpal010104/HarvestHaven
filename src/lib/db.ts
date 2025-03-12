import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add new product
export const addProduct = async (product: { name: string; price: number; imageUrl: string }) => {
  return addDoc(collection(db, "products"), product);
};

// Get all products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
