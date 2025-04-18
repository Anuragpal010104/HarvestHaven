"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { 
  auth, 
  db 
} from "./firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser, 
  UserCredential 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define a custom user type that extends Firebase's User with additional fields
interface CustomUser extends FirebaseUser {
  firstName?: string;
  lastName?: string;
  role?: "buyer" | "seller";
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, role: "buyer" | "seller", firstName: string, lastName: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch additional user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Merge Firebase user with Firestore data
          setUser({
            ...currentUser,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
          });
        } else {
          setUser(currentUser); // Fallback to just Firebase user if no Firestore data
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setError(null);
    }, (error: unknown) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      throw error;
    }
  }, []);

  const register = useCallback(async (
    email: string, 
    password: string, 
    role: "buyer" | "seller",
    firstName: string,
    lastName: string
  ) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore with firstName and lastName
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Create role-specific profile
      const profileCollection = role === "buyer" ? "buyerProfiles" : "sellerProfiles";
      await setDoc(doc(db, profileCollection, userCredential.user.uid), {
        ...(role === "buyer" ? { shippingAddresses: [], wishlist: [] } : { storeName: "", storeDescription: "" })
      });

      return userCredential;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      throw error;
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}