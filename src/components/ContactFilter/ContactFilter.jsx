import { Component } from 'react';

class ContactFilter extends Component {
  state = {
    filter: '',
  };
  hendleFilterChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  render() {
    return (
      <div>
        <p>Find contacts by name</p>
        <input
          type="text"
          value={this.state.filter}
          onChange={this.hendleFilterChange}
        />
      </div>
    );
  }
}

export default ContactFilter;
