import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import ContactFilter from './ContactFilter';

export class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
    existingNames: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    existingNames: [],
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
    existingNames: this.props.existingNames,
  };

  addContact = contacts => {
    console.log(contacts);
    const { name, number } = contacts;
    const isUnique = this.checkContactUnique(name);
    if (isUnique) {
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      Notiflix.Notify.success(`${name} is add from contacts`);
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
        existingNames: [...prevState.existingNames, name.toLowerCase()],
      }));
    }
  };

  checkContactUnique = name => {
    const { existingNames } = this.state;
    if (existingNames.includes(name.toLowerCase())) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
      return false;
    }
    return true;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterChange = filter => this.setState({ filter });
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const VisibleContacts = this.getVisibleContacts();
    return (
      <>
        <div className="container">
          <h1>Phonebook</h1>
          <ContactForm
            onSubmit={this.addContact}
            onCheckUnique={this.checkContactUnique}
          />
          <h2>Contacts</h2>
          <ContactFilter filter={filter} onChange={this.filterChange} />
          <ContactList
            contacts={VisibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
