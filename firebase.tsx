import { initializeApp, getApps } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw4Mfzf4Tj2fCbHcz7YGau-MfyySb6INA",
  authDomain: "polihack-bc280.firebaseapp.com",
  projectId: "polihack-bc280",
  storageBucket: "polihack-bc280.firebasestorage.app",
  messagingSenderId: "466376237699",
  appId: "1:466376237699:web:e9962c565f03dd94dbf1b6",
};
// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence

const auth = firebaseAuth.initializeAuth(firebaseApp, {
  persistence: firebaseAuth.getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
