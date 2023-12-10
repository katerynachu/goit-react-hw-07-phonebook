import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsActions';
import { nanoid } from 'nanoid';

const initialState = {
    items: [],
    isLoading: false,
    error: null

};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const { name, number } = action.payload;

        const isDuplicate = state.items.some(
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
  
          state.items.push(newContact);
      }})
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export { fetchContacts, addContact, deleteContact };

export default contactsSlice.reducer;
