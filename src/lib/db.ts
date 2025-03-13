import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  getDoc 
} from "firebase/firestore";

// Define Product interface for Firestore (without id, as it's added by Firestore)
interface ProductBase {
  sellerId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageBase64?: string;
  createdAt?: string;
}

// Define Product interface with id for use after retrieval
export interface Product extends ProductBase {
  id: string;
}

// Add a new product
export const addProduct = async (
  product: ProductBase,
  imageFile?: File
): Promise<string> => {
  try {
    let imageBase64 = "";
    if (imageFile) {
      imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
      
      if (imageBase64.length > 900000) { // Rough check for 1MB limit
        throw new Error("Image size too large. Please upload an image smaller than 1MB.");
      }
    }

    const productData = {
      ...product,
      imageBase64,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    return docRef.id; // Return the generated ID
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(`Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get products by seller ID
export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  try {
    const q = query(collection(db, "products"), where("sellerId", "==", sellerId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products by seller:", error);
    throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error(`Failed to fetch all products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(collection(db, "products"), where("category", "==", category.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Update an existing product
export const updateProduct = async (productId: string, updatedFields: Partial<ProductBase>): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedFields);
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};