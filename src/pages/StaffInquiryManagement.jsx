import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import StaffInquiryList from '../components/StaffInquiryList'; // Import StaffInquiryList
import { useNavigate } from 'react-router-dom';

function StaffInquiryManagement() {
    const [inquiries, setInquiries] = useState([]);
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiries = async () => {
            const querySnapshot = await getDocs(collection(db, "inquiries"));
            const inquiriesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setInquiries(inquiriesData);
        };
        fetchInquiries();
    }, []);

    return (
        <div>
            <h2>スタッフ お問い合わせ管理画面</h2>
            <StaffInquiryList inquiries={inquiries} /> {/* Pass inquiries data to StaffInquiryList */}
        </div>
    );
}

export default StaffInquiryManagement;