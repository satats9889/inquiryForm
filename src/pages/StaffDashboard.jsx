import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore(); // Firestoreインスタンス

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const q = query(collection(db, "inquiries"), orderBy("date", "asc")); // 日付順に取得
        const querySnapshot = await getDocs(q);
        const inquiryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInquiries(inquiryList);
      } catch (error) {
        console.error("お問い合わせの取得中にエラーが発生しました: ", error);
      }
    };

    fetchInquiries();
  }, [db]);

  const handleClick = (id) => {
    // 詳細画面への遷移
    navigate(`/staff/inquiry/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>お問い合わせ管理</h1>
      <div className="inquiry-list">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="inquiry-item"
            onClick={() => handleClick(inquiry.id)}
          >
            <div className="inquiry-header">
              <span>{new Date(inquiry.date).toLocaleString()}</span>
            </div>
            <div className="inquiry-content">
              {inquiry.content.length > 100
                ? `${inquiry.content.slice(0, 100)}...`
                : inquiry.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;