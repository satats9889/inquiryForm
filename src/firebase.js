import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
    apiKey: "dummy-api-key",
    authDomain: "localhost",
    projectId: "demo-project",
    storageBucket: "dummy-bucket",
    messagingSenderId: "dummy-sender-id",
    appId: "dummy-app-id",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// エミュレーターに接続
if (window.location.hostname === "localhost") {
connectFirestoreEmulator(db, "localhost", 8080); // Firestore
connectAuthEmulator(auth, "http://localhost:9099"); // Authentication
}

// Firebaseアプリ初期化
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;




export { db, auth };