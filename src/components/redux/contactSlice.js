import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contact-key',
  storage,
  whitelist: ['contacts'],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter:'',
    filteredContacts: [],
    
  },
  reducers: {
    updateContacts(state, action) {
      state.filteredContacts = action.payload;
    },
    addContact(state, action) {
      const { name, number } = action.payload;

      const isDuplicate = state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (isDuplicate) {
        alert(`Contact  ${name} is already in contacts`);
      } else {
        const newContact = {
          id: nanoid(),
          name: name,
          number: number,
        };

        state.contacts.push(newContact);
      }
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state,action){
      state.filter = action.payload;

  }
  },
});
export const persistedReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const contactReducer = contactSlice.reducer;
export const { addContact,filterContact, removeContact, updateContacts } =
  contactSlice.actions;
