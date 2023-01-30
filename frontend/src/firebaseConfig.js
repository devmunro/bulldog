import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcTIwZBuH3oWyOwcW4qDicjQR--krCTqM",
  authDomain: "bulldog-25872.firebaseapp.com",
  projectId: "bulldog-25872",
  storageBucket: "bulldog-25872.appspot.com",
  messagingSenderId: "531691187397",
  appId: "1:531691187397:web:b640aeb763532b254714ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

