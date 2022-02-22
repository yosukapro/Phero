/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { userContact, fetchUpdateContact, fetchAddContact, fetchDeleteContact } from 'services/API/User';
import { closeNav } from 'store/actions/nav';
import ScreenTitleImage from 'components/ScreenTitleImage';
import ContactList from 'components/ContactList';
import AddButton from 'components/AddButton';
import Header from 'components/Header';
import Nav from 'components/Nav';
import NavBar from 'components/NavBar';
import ContactForm from 'components/ContactForm';

import theme from 'theme';
import Styles from './InfosAlerts.style';

const employerContactText = 'RENSEIGNÉ PAR L\'EMPLOYEUR';
const personalContactText = 'AJOUT DE CONTACTS PERSONNELS';

const InfosAlerts = ({ navigation }) => {
  const dispatch = useDispatch();
  const navState = useSelector(state => state.nav);
  const [employerContacts, setEmployerContacts] = useState([]);
  const [personalContacts, setPersonalContacts] = useState([]);
  const [newContact, setNewContact] = useState(false);

  const getContact = () => {
    userContact()
      .then(response => {
        console.log(response);
        switch (response.status) {
          case 200:
            if (response.data.contacts && response.data.teams) {
              setEmployerContacts(response.data.teams[0].contacts);
              setPersonalContacts(response.data.contacts);
            }
            break;
          default:
            throw new Error('Cannot get contacts.');
        }
      })
      .catch(e => console.error(e)); // @TODO gestion d'erreur
  };

  const updateContact = (contact, id) => {
    console.log('update :', contact, id);
    fetchUpdateContact(contact, id)
      .then(resp => {
        console.log(resp);
        navigation.push('InfosAlerts');
      })
      .catch(e => console.error(e));
  };

  const deleteContact = id => {
    fetchDeleteContact(id)
      .then(resp => {
        console.log(resp);
        navigation.push('InfosAlerts');
      })
      .catch(e => console.error(e));
  };

  const addContact = contact => {
    fetchAddContact(contact)
      .then(response => {
        console.log('addContact', response);
        navigation.push('InfosAlerts');
      })
      .catch(e => console.log('addContact', e));
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <ScrollView style={Styles.container}>
        <Header navigation={navigation} title='Infos Alertes' />
        <ScreenTitleImage text='INFOS' textBold='ALERTES' image={require('assets/img/infosAlerts.png')} />
        <View style={Styles.container}>
          <Text style={[Styles.contactText, { color: theme.primaryColor }]}>
            {employerContactText}
          </Text>
          <ContactList users={employerContacts} />
          <Text style={[Styles.contactText, { color: theme.primaryColor }]}>
            {personalContactText}
          </Text>
          <ContactList
            users={personalContacts}
            editable
            updateContact={(contact, id) => updateContact(contact, id)}
            deleteContact={contact => deleteContact(contact)}
            newContact
          />
          {personalContacts.length < 3 && !newContact && (
            <View style={{ alignItems: 'center' }}>
              <AddButton onPress={() => { setNewContact(true); }} />
            </View>
          )}
          {newContact && (
            <ContactForm
              onCancel={() => { setNewContact(false); }}
              submit={contact => addContact(contact)}
            />
          )}
        </View>
      </ScrollView>
      <Nav navigation={navigation} onClose={() => dispatch(closeNav())} show={navState} />
      <NavBar navigation={navigation} isActive='alert' />
    </>
  );
};

InfosAlerts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InfosAlerts;
