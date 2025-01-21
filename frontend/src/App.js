import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contacts from the backend
  const getContacts = async () => {
    const response = await fetch('http://localhost:5000/contacts');
    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    getContacts();
  }, []);

  // Pass the selected contact for editing
  const handleEditContact = (contact) => {
    setEditingContact(contact);  // Set the contact being edited
  };

  return (
    <div className="app-container">
      <h1>Contact List</h1>
      <ContactForm 
        getContacts={getContacts} 
        editingContact={editingContact} 
        setEditingContact={setEditingContact} 
      />
      <ContactList 
        contacts={contacts} 
        getContacts={getContacts} 
        handleEditContact={handleEditContact} 
      />
    </div>
  );
};

export default App;
