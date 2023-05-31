import React, { useState,useEffect} from "react";
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";
import { Section } from "components/Section/Section";
import { FormHoocks } from "components/Form/FormHoocks";
import Contacts from '../json/Contacts.json';


export const AppH = () => {
    const [filter, setFilter] = useState('')
    const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? Contacts)
    
    useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts))  
    }, [contacts])
    
    const OnFilterChange = event => {
    
    const {value} = event.currentTarget
    setFilter(value)
    }
    
    const addContact = contact => {
    setContacts(
       [contact, ...contacts]
    );
    };
    
    const ClearFilter = () => {
     setFilter('')
    }
    
    const FilterContact = () => {
    const filterNormalize = filter.toLowerCase().trim()

    return contacts.filter(contact => contact.name.toLowerCase().includes(filterNormalize))
    }
    
    const deleteContact = contactId => {
  setContacts(prevstate => ( prevstate.filter(contact => contact.id !== contactId)))
    }
    
    return (
        <>
        <Section title="Phonebook"> <FormHoocks 
        contacts={contacts}
        addContact={addContact}
        />
        </Section>
        <Section title="Contacts">
          <Filter
          value={filter}
          OnChange={OnFilterChange}
          Onclick={ClearFilter}
        />
        <ContactList
          contactList={FilterContact()}
          onDelete={deleteContact}
        />
      </Section>
        </>
        )
}