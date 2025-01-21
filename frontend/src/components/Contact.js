import React from 'react';
import { FaPhone, FaEnvelope, FaPen, FaTrash } from "react-icons/fa";

import './Contact.css';

const Contact = ({ contact, getContacts, handleEditContact }) => {
  const handleDelete = async () => {
    // Send DELETE request using fetch
    await fetch(`http://localhost:5000/contacts/${contact.id}`, {
      method: 'DELETE',
    });
    getContacts();  // Re-fetch contacts after deletion
  };

  return (
    <div className="contact-item">
      <div className="contact-info">
        <div className="contact-name">{contact.name}</div>
        <div className="contact-details">
          <FaPhone className="contact-icon" />
          <span>{contact.mobile}</span>
        </div>
        <div className="contact-details">
          <FaEnvelope className="contact-icon" />
          <span>{contact.email}</span>
        </div>
      </div>
      <div className="button-group">
        <button className="md-button secondary" onClick={() => handleEditContact(contact)}>
          <FaPen />
          <span>Edit</span>
        </button>
        <button className="md-button destructive" onClick={handleDelete}>
          <FaTrash />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
