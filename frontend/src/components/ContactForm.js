import React, { useState, useEffect } from 'react';
import './ContactForm.css';


const ContactForm = ({ getContacts, editingContact, setEditingContact }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setMobile(editingContact.mobile);
      setEmail(editingContact.email);
    } else {
      setName('');
      setMobile('');
      setEmail('');
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, mobile, email };

    if (editingContact) {
      // If editing, send PUT request to update
      await fetch(`http://localhost:5000/contacts/${editingContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      setEditingContact(null); // Reset editing state
    } else {
      // If adding, send POST request to create
      await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
    }

    // After adding/updating, clear the form and refetch the contacts
    setName('');
    setMobile('');
    setEmail('');
    getContacts();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">
      {editingContact ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
