import { db, storage } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Product {
  sellerId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "active" | "inactive" | "sold_out";
}

// Add new product with image upload
export const addProduct = async (
  product: Omit<Product, "createdAt" | "updatedAt" | "status">,
  imageFile?: File
) => {
  try {
    let imageUrl = "";
    if (imageFile) {
      const storageRef = ref(storage, `product-images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const productData = {
      ...product,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active" as const
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Product)
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get products by seller
export const getSellerProducts = async (sellerId: string) => {
  try {
    const q = query(collection(db, "products"), where("sellerId", "==", sellerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Product)
    }));
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};