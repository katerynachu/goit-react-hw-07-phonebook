import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    const response = await fetch('https://65745b27f941bda3f2afa429.mockapi.io/contacts/items');
    const data = await response.json();
    return data;
  });
  
  export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
    const response = await fetch('https://65745b27f941bda3f2afa429.mockapi.io/contacts/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();
    return data;
  });
  
  export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
    await fetch(`https://65745b27f941bda3f2afa429.mockapi.io/contacts/items/${contactId}`, {
        method: 'DELETE',
    });
    return contactId;
  });
