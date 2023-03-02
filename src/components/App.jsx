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

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const isNameUnique = contacts.every(
      contact => contact.name.toLowerCase() !== name.toLowerCase()
    );

    const isNumberUnique = contacts.every(contact => contact.number !== number);

    if (isNameUnique && isNumberUnique) {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };

      Notiflix.Notify.success(`${name} is added to contacts`);

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    } else {
      const message = isNameUnique
        ? `Number ${number} is already in contacts`
        : `${name} is already in contacts`;

      Notiflix.Notify.failure(message);
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <ContactFilter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
