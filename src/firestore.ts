import type firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

let db: firebase.firestore.Firestore = null;

export const firestore= async (): Promise<firebase.firestore.Firestore> => {
  if (db) {
    return db;
  }

  // Checks for the client
  if (typeof window !== "undefined") {
    const fb: any = (await import("firebase/app")).default;

    db = fb.firestore();
    return db;
  }

  const fb: any = await import("firebase/compat/app");
  return fb.firestore() as firebase.firestore.Firestore;
}