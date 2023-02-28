import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        <p>
          {name}
          {number}
        </p>
        <button type="button" onClick={() => onDeleteContact(id)}>
          removeContact
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
