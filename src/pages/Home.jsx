import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Inquiry Form</h1>
            <div className="button-container">
                <Link to="/staff-login">
                    <button>スタッフページ</button>
                </Link>
                <Link to="/guest-inquiry">
                    <button>ゲストページ</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;