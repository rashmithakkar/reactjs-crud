import React from 'react';
import Contact from './Contact';

const ContactList = ({ contacts, getContacts, handleEditContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact 
          key={contact.id} 
          contact={contact} 
          getContacts={getContacts} 
          handleEditContact={handleEditContact} 
        />
      ))}
    </ul>
  );
};

export default ContactList;
