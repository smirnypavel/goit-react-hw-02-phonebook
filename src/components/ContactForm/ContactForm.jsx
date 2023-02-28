import { Component } from 'react';
// import { nanoid } from 'nanoid';

class ContactForm extends Component {
  state = {
    name: ' ',
    number: ' ',
  };

  hendleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);

    this.reset();
  };
  reset = () => {
    this.setState({ name: ' ', number: ' ' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя
          <input
            value={this.state.name}
            onChange={this.hendleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Phone
          <input
            value={this.state.number}
            onChange={this.hendleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">AddContact</button>
      </form>
    );
  }
}

export default ContactForm;
