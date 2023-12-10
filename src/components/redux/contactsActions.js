import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const notify = name => toast(`Contact ${name} is already in contacts`);

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(
    'https://65745b27f941bda3f2afa429.mockapi.io/contacts/items'
  );
  const data = await response.json();
  return data;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { getState, rejectWithValue }) => {
    const currentState = getState();

    const existingContact = currentState.contacts.items.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      notify(existingContact.name);
      return rejectWithValue({ error: 'Duplicate contact', existingContact });
    }

    try {
      const response = await fetch(
        'https://65745b27f941bda3f2afa429.mockapi.io/contacts/items',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({
        error: 'Failed to add contact',
        originalError: error,
      });
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await fetch(
      `https://65745b27f941bda3f2afa429.mockapi.io/contacts/items/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    return contactId;
  }
);
