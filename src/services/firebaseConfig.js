import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1TIV2_gVLzGiVStvYjOmjXcOu7MSvYNE",
  authDomain: "orchid-817ad.firebaseapp.com",
  projectId: "orchid-817ad",
  storageBucket: "orchid-817ad.firebasestorage.app",
  messagingSenderId: "193410633564",
  appId: "1:193410633564:web:935b0db91f97991c5dfb99",
  measurementId: "G-EQ7YDPY0P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export default app;
