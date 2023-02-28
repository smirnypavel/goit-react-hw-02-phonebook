import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    // name: '',
  };
  addContact = contacts => {
    console.log(contacts);
    const contact = {
      name: contacts.name,
      number: contacts.number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
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
        <ContactForm onSubmit={this.addContact} />

        <ContactList contacts={contacts} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}
