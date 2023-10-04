import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Container } from './App.styled';
import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contact')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`Oops, the contact with name ${name} already exists`);
    }
    const newState = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newState, ...contacts]);
  };

  const handleDelete = contactName => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.name !== contactName);
    });
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <Form handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <h3>There are no any contacts here</h3>
      ) : (
        <>
          <Filter onChange={handleFilterChange} filter={filter} />
          <Contacts contacts={filterContacts()} handleDelete={handleDelete} />
        </>
      )}
    </Container>
  );
}

