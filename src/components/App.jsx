import React from 'react';
import { Filter } from './Filter/Filter';
import {ContactList} from './ContactList/ContactList'
import {ContactForm } from './ContactForm/ContactForm';
import { GlobalStyle } from './GlobalStyle/Globalstyle';
import { Titleh1,Titleh2 } from './App.styled';
import { Toaster } from 'react-hot-toast';




export const App = () => {

    return (
      <div>
      <Titleh1>Phonebook</Titleh1>
      <ContactForm/>
      <Titleh2>Contacts</Titleh2>
      <Filter />
      <ContactList />
      <Toaster position="top-right" />
      <GlobalStyle />
    </div>
    );
  }


