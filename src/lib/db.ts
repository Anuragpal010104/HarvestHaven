import { ReactNode } from "react";
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
  getDoc,
  arrayUnion,
  arrayRemove,
  setDoc 
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
// export interface Product extends ProductBase {
//   id: string;
// }
export interface Product {
  rating: ReactNode;
  badge: ReactNode;
  image: string;
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sellerId: string;
  createdAt: string;
  imageBase64?: string;
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
      
      if (imageBase64.length > 1000000) { // Rough check for 1MB limit
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Update an existing product
export const updateProduct = async (productId: string, updatedFields: Partial<ProductBase>): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedFields);
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const addToCart = async (userId: string, product: Product): Promise<void> => {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    const cartItem = {
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.imageBase64 || "/placeholder.svg",
    };

    if (cartSnap.exists()) {
      const existingItems = cartSnap.data().items || [];
      const existingItemIndex = existingItems.findIndex(
        (item: { productId: string }) => item.productId === cartItem.productId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...existingItems];
        updatedItems[existingItemIndex].quantity += 1;
        await updateDoc(cartRef, { items: updatedItems });
      } else {
        await updateDoc(cartRef, { items: [...existingItems, cartItem] });
      }
    } else {
      await setDoc(cartRef, {
        userId: userId,
        items: [cartItem],
      });
    }
  } catch (error: unknown) {
    console.error("Error adding to cart:", error);
    throw new Error(`Failed to add to cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Wishlist functions
export const addToWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const buyerProfileRef = doc(db, "buyerProfiles", userId);
    await updateDoc(buyerProfileRef, {
      wishlist: arrayUnion(productId)
    });
  } catch (error: unknown) {
    console.error("Error adding to wishlist:", error);
    throw new Error(`Failed to add to wishlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const buyerProfileRef = doc(db, "buyerProfiles", userId);
    await updateDoc(buyerProfileRef, {
      wishlist: arrayRemove(productId)
    });
  } catch (error: unknown) {
    console.error("Error removing from wishlist:", error);
    throw new Error(`Failed to remove from wishlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getWishlistItems = async (userId: string): Promise<Product[]> => {
  try {
    const buyerProfileRef = doc(db, "buyerProfiles", userId);
    const buyerProfileSnap = await getDoc(buyerProfileRef);
    
    if (!buyerProfileSnap.exists()) return [];
    
    const wishlistIds = buyerProfileSnap.data().wishlist || [];
    if (wishlistIds.length === 0) return [];

    const wishlistProducts = await Promise.all(
      wishlistIds.map(async (productId: string) => {
        const product = await getProductById(productId);
        return product;
      })
    );

    return wishlistProducts.filter((product): product is Product => product !== null);
  } catch (error: unknown) {
    console.error("Error fetching wishlist items:", error);
    throw new Error(`Failed to fetch wishlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Add a review to a product
export const addReview = async (productId: string, reviewContent: string): Promise<void> => {
  try {
    const reviewData = {
      content: reviewContent,
      createdAt: new Date().toISOString(),
    };

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      reviews: arrayUnion(reviewData),
    });
  } catch (error: unknown) {
    console.error("Error adding review:", error);
    throw new Error(`Failed to add review: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get reviews for a product
export const getReviews = async (productId: string): Promise<{ content: string; createdAt: string }[]> => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      return productData.reviews || [];
    }

    return [];
  } catch (error: unknown) {
    console.error("Error fetching reviews:", error);
    throw new Error(`Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

