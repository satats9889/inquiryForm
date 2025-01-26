import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./GuestInquiryForm.css";
import { FiSend } from "react-icons/fi";

const GuestInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    inquiry: "",
  });
  const [errors, setErrors] = useState({});
  const db = getFirestore(); // Firestoreインスタンス
  const navigate = useNavigate();

  // プルダウンメニューのオプション
  const productOptions = [
    { id: "A001", name: "Product A001" },
    { id: "A002", name: "Product A002" },
    { id: "A003", name: "Product A003" },
    { id: "A016", name: "Product A016" },
  ];

  // バリデーション関数
  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length > 16) {
      newErrors.name = "氏名は必須で、16文字以下です";
    }
    if (!formData.email || formData.email.length > 200) {
      newErrors.email = "メールアドレスは必須で、200文字以下です";
    }
    if (!formData.phone || formData.phone.length > 12) {
      newErrors.phone = "電話番号は必須で、12文字以下です";
    }
    if (!formData.product) {
      newErrors.product = "製品種別を選択してください";
    }
    if (!formData.inquiry || formData.inquiry.length > 2000) {
      newErrors.inquiry = "お問い合わせ内容は必須で、2000文字以下です";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Firestoreへのデータ送信
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        date: new Date().toISOString(), // 送信日時を追加
      });

      // 送信成功後、送信完了画面へリダイレクト
      navigate("/guest/complete");
    } catch (error) {
      console.error("お問い合わせ送信中にエラーが発生しました: ", error);
      alert("エラーが発生しました。再度お試しください。");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="inquiry-form">
      <h1>お問い合わせフォーム</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>氏名 (必須)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="氏名を入力してください"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>メールアドレス (必須)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールアドレスを入力してください"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>電話番号 (必須)</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="電話番号を入力してください"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>製品種別 (必須)</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
          >
            <option value="">製品を選択してください</option>
            {productOptions.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.product && <span className="error">{errors.product}</span>}
        </div>

        <div className="form-group">
          <label>お問い合わせ内容 (必須)</label>
          <textarea
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            placeholder="お問い合わせ内容を入力してください"
          />
          {errors.inquiry && <span className="error">{errors.inquiry}</span>}
        </div>

        <button type="submit" className="submit-button">
          <FiSend /> 送信する
        </button>
      </form>
    </div>
  );
};

export default GuestInquiryForm;