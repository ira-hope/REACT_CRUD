

import React, { useState } from 'react';

import UserDetails from './components/UserDetails';
import ContactDetails from './components/ContactDetails';
// import DetailsPage from './components/details';

const App = () => {
  const [userId, setUserId] = useState('');
  const [userFormData, setUserFormData] = useState(null);
  const [contactFormData, setContactFormData] = useState(null);

  const handleUserFormSubmit = (data) => {
    setUserId(data.userId);
    setUserFormData(data);
  };

  const handleContactFormSubmit = (data) => {
    setContactFormData(data);
    // Log the updated form data after state has been set
    console.log('User Form Data:', userFormData);
    console.log('Contact Form Data:', contactFormData);
    // Example: Send data to server or perform further actions
  };

  return (
    <div className="container">
      <UserDetails onSubmit={handleUserFormSubmit} />
      <ContactDetails onSubmit={handleContactFormSubmit} userId={userId} />
      {/* {userId && <DetailsPage userId={userId} />} */}
    </div>
  );
};

export default App;
