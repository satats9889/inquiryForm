import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./StaffLogin.css";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 仮のFirebase初期化設定
  const auth = getAuth(); // Firebase Authenticationのインスタンス

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase Authenticationによるログイン
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログインに成功しました！");
      // スタッフ管理画面へ遷移 (仮)
      window.location.href = "/staff/dashboard";
    } catch (err) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードをご確認ください。");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>スタッフログイン</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレスを入力してください"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力してください"
            required
          />
        </div>

        {error && <span className="error">{error}</span>}

        <button type="submit" className="login-button">
          ログイン
        </button>
      </form>
    </div>
  );
};

export default StaffLogin;