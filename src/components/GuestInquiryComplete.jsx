import React from "react";
import { useNavigate } from "react-router-dom";
import "./GuestComplete.css";

const GuestComplete = () => {
  const navigate = useNavigate();

  const handleViewResponse = () => {
    navigate("/guest/chat");
  };

  return (
    <div className="complete-container">
      <h1>お問い合わせ送信完了</h1>
      <p>お問い合わせありがとうございました。</p>
      <button onClick={handleViewResponse}>回答を見る</button>
    </div>
  );
};

export default GuestComplete;