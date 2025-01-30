import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

function StaffInquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchInquiries = async () => {
      const querySnapshot = await getDocs(collection(db, "inquiries")); // Replace "inquiries" with your actual collection name
      const inquiriesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInquiries(inquiriesData);
    };
    fetchInquiries();
  }, []);

  return (
    <div>
      <h2>Staff Inquiry Management</h2>
      <ul>
        {inquiries.map((inquiry) => (
          <li key={inquiry.id} onClick={() => navigate(`/staff-inquiry-detail/${inquiry.id}`)}>
            {/* Display inquiry details */}
            <p>{inquiry.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffInquiryManagement;