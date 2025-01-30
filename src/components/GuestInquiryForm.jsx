import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GuestInquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log('Form submitted:', { name, email, message });
    navigate('/guest-inquiry-complete'); // Redirect to the completion page
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default GuestInquiryForm;