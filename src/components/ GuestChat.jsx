// import React, { useState, useEffect } from 'react';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from '../firebase'; // Import your Firebase config

// function GuestChat() {
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
//                 sender: "guest", // Or get the actual guest user ID
//                 createdAt: serverTimestamp()
//             });
//             setNewMessage('');
//         }
//     };

//     return (
//         <div>
//             <h2>Guest Chat</h2>
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

// export default GuestChat;

import React from 'react';
import Chat from './Chat';

function GuestChat() {
    return (
        <div>
            <h2>Guest Chat</h2>
            <Chat userType="guest" /> {/* Pass userType prop */}
        </div>
    );
}

export default GuestChat;