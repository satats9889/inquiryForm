// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from '../firebase'; // Import your Firebase config

// function StaffInquiryDetail() {
//     const { id } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     useEffect(() => {
//         const q = query(collection(db, "chats"), orderBy("createdAt")); // "chats" is your collection name
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedMessages = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMessages(fetchedMessages);
//         });
//         return () => unsubscribe(); // Cleanup on unmount
//     }, []);

//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (newMessage.trim() !== '') {
//             await addDoc(collection(db, "chats"), {
//                 text: newMessage,
//                 sender: "staff", // Or get the actual staff user ID
//                 createdAt: serverTimestamp()
//             });
//             setNewMessage('');
//         }
//     };

//     return (
//         <div>
//             <h2>Staff Inquiry Detail</h2>
//             <p>Inquiry ID: {id}</p>
//             <div className="message-list">
//                 {messages.map((message) => (
//                     <div key={message.id} className={`message ${message.sender}`}>
//                         {message.text}
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// }

// export default StaffInquiryDetail;

import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';

function StaffInquiryDetail() {
    const { id } = useParams();
    return (
        <div>
            <h2>Staff Inquiry Detail</h2>
            <p>Inquiry ID: {id}</p>
            <Chat userType="staff" /> {/* Pass userType prop */}
        </div>
    );
}

export default StaffInquiryDetail;