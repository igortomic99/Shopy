import firebaseConfig from "./env";

export async function initFirebase() {
  if (typeof window !== "undefined") {
    const fb: any = (await import("firebase/compat/app")).default;
    await import("firebase/auth");
    await import("firebase/firestore");
    await import("firebase/storage");
    if (fb?.apps?.length == 0) {
      fb.initializeApp(firebaseConfig);
    }
    return;
  }

  const fb: any = await import("firebase/compat/app");
  if (fb?.apps?.length == 0) {
    fb.initializeApp(firebaseConfig);
    return;
  }
}
