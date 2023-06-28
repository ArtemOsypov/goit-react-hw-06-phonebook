import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import { initialContacts } from 'data/initialContacts';
import { useLocalStorage } from 'hooks/useLocalStorage';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handlerSubmit = newContact => {
    setContacts(prevContacts => {
      if (prevContacts.find(contact => contact.name === newContact.name)) {
        alert(`${newContact.name} is already in contacts`);
        return prevContacts;
      }
      return [newContact, ...prevContacts];
    });
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // componentDidMount() {
  //   const dataNumbers = localStorage.getItem(LS_KEY);

  //   if (dataNumbers) {
  //     this.setState({ contacts: JSON.parse(dataNumbers) });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  //   }
  // }

  //  handleSubmit = data => {
  //   const { contacts } = this.state;
  //   const isExistContact = contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase());
  //    (isExistContact)
  //      ? alert(`${data.name} is already in contacts`)
  //      : this.setState(({ contacts }) => ({ contacts: [data, ...contacts] }));


  // };
    
  // onFilter = e => {
  //   const { value } = e.currentTarget;
  //   this.setState({ filter: value });
  // };

  // deleteContact = contactId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //   }));
  // };

  
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handlerSubmit} />

      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList deleteContact={deleteContact} contacts={filteredContacts} />
    </Container>
  );
};
  
