import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Upload product image
export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
