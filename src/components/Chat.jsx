import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'; // Import your Firebase config

function Chat({ userType }) { // Add userType prop
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const q = query(collection(db, "chats"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        });
        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            await addDoc(collection(db, "chats"), {
                text: newMessage,
                sender: userType, // Use userType prop here
                createdAt: serverTimestamp()
            });
            setNewMessage('');
        }
    };

    return (
        <div>
            <div className="message-list">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;