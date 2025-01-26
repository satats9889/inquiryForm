import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const seedData = async () => {
  const inquiries = [
    {
      id: "1",
      date: "2025-01-01T10:00:00.000Z",
      content: "お問い合わせ内容1",
    },
    {
      id: "2",
      date: "2025-01-02T12:00:00.000Z",
      content: "お問い合わせ内容2",
    },
  ];

  for (const inquiry of inquiries) {
    await setDoc(doc(db, "inquiries", inquiry.id), inquiry);
  }

  console.log("ダミーデータを挿入しました！");
};

seedData();
