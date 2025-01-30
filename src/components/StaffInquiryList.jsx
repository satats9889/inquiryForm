import React from 'react';
import { useNavigate } from 'react-router-dom';

function StaffInquiryList({ inquiries }) {
    const navigate = useNavigate();

    return (
        <ul>
            {inquiries.map((inquiry) => (
                <li key={inquiry.id} onClick={() => navigate(`/staff-inquiry-detail/${inquiry.id}`)}>
                    {/* お問い合わせ内容の表示 */}
                    <p>{inquiry.message}</p>
                </li>
            ))}
        </ul>
    );
}

export default StaffInquiryList;