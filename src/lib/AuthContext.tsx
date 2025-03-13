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
  User, 
  UserCredential 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, role: "buyer" | "seller") => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, role: "buyer" | "seller") => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Create role-specific profile
      const profileCollection = role === "buyer" ? "buyerProfiles" : "sellerProfiles";
      await setDoc(doc(db, profileCollection, userCredential.user.uid), {
        ...(role === "buyer" ? { shippingAddresses: [], wishlist: [] } : { storeName: "", storeDescription: "" })
      });

      return userCredential;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      setError(error.message);
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