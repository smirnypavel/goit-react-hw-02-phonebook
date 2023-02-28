import React, { Component } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import ContactFilter from './ContactFilter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contacts => {
    console.log(contacts);
    const contact = {
      name: contacts.name,
      number: contacts.number,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  checkContactUnique = (name) => {
    const { contacts } = this.state;
    const findContact = !!contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    findContact && Notiflix.Notify.failure(`${name} is already in contacts`);
    return !findContact;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts } = this.state;
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.addContact}
          onCheckUnique={this.checkContactUnique}
        />
        <h2>Contacts</h2>
        <ContactFilter />
        <ContactList contacts={contacts} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}
