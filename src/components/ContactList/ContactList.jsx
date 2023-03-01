import React from 'react';
import PropTypes from 'prop-types';
import styled from './ContactList.module.css';
import { TbTrashX } from "react-icons/tb";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styled.ul}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styled.li}>
        <p>
          {name} <br />
          {number}
        </p>
        <button
          type="button"
          onClick={() => onDeleteContact(id)}
          className={styled.button}
        >
          <TbTrashX/>
        </button>
      </li>
    ))}
  </ul>
);
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
