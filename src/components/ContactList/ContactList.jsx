import React from 'react';
import { List, ListItem, DeleteButton } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'components/redux/contactSlice';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filteredContacts);

  const dispatch = useDispatch();

  const show = filter.length > 0 ? filter : contacts;

  return (
    
    <List>
      {show.map(contact => (
        <ListItem key={contact.id}>
          {contact.name} : {contact.number}
          <DeleteButton onClick={() => dispatch(removeContact(contact.id))}>
            delete
          </DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};
