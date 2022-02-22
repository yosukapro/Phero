import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import ContactForm from 'components/ContactForm';

import Styles from './Contact.style';

const Contact = ({
  label,
  id,
  firstname,
  lastname,
  phone,
  email,
  editable,
  edit,
  editById,
  cancel,
  updateContact,
  deleteContact,
}) => {
  const show = () => (
    <View style={Styles.container}>
      {editable ? (
        <View style={Styles.edit}>
          <Text style={Styles.title}>
            {label}
          </Text>
          <TouchableOpacity onPress={editById}>
            <Text>Modifier</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={Styles.title}>
          {label}
        </Text>
      )}
      <Text style={Styles.info}>
        {`${firstname} ${lastname}`}
      </Text>
      { !!phone && <Text style={Styles.info}>{phone}</Text>}
      { !!email && <Text style={Styles.info}>{email}</Text>}
    </View>
  );

  const form = () => (
    <ContactForm
      defaultFirstname={firstname}
      defaultLastname={lastname}
      defaultEmail={email}
      defaultPhone={phone}
      submit={contact => updateContact(contact, id)}
      deleteContact={() => deleteContact(id)}
      onCancel={() => cancel()}
    />
  );

  return (edit ? form() : show());
};

Contact.propTypes = {
  label: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default Contact;
