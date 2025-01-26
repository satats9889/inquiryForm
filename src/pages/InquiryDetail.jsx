import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./InquiryDetail.css";

const InquiryDetail = () => {
  const { inquiryId } = useParams(); // URL パラメータから ID を取得
  const [inquiry, setInquiry] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const db = getFirestore();

  // お問い合わせ内容を取得
  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const docRef = doc(db, "inquiries", inquiryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInquiry(docSnap.data());
        } else {
          console.error("お問い合わせが見つかりません");
        }
      } catch (error) {
        console.error("お問い合わせの取得中にエラーが発生しました: ", error);
      }
    };

    fetchInquiry();
  }, [inquiryId, db]);

  // チャットメッセージを取得（リアルタイム）
  useEffect(() => {
    const messagesRef = collection(db, `inquiries/${inquiryId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // クリーンアップ
  }, [inquiryId, db]);

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messagesRef = collection(db, `inquiries/${inquiryId}/messages`);
    try {
      await addDoc(messagesRef, {
        sender: "staff", // スタッフ送信
        text: newMessage,
        timestamp: new Date(),
      });
      setNewMessage(""); // 入力フィールドをクリア
    } catch (error) {
      console.error("メッセージの送信中にエラーが発生しました: ", error);
    }
  };

  return (
    <div className="inquiry-detail-container">
      <h1>お問い合わせ詳細</h1>
      {inquiry ? (
        <div className="inquiry-content">
          <h2>お問い合わせ内容</h2>
          <p>{inquiry.content}</p>
        </div>
      ) : (
        <p>お問い合わせを読み込み中...</p>
      )}

      <div className="chat-container">
        <h2>チャット</h2>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.sender === "staff" ? "staff-message" : "guest-message"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
          />
          <button onClick={handleSendMessage}>送信</button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;