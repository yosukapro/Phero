import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import v4 from 'uuid';
import LinearGradient from 'react-native-linear-gradient';

import Contact from 'components/Contact';
import Styles from './ContactList.style';

const ContactList = ({
  users,
  editable = false,
  updateContact = () => {},
  deleteContact = () => {},
}) => {
  const [editID, setEditID] = useState(null);
  return (
    <View style={Styles.container}>
      {users.map((user, i) => (
        <View key={v4()}>
          <Contact
            label={`CONTACT ${i + 1}`}
            id={user.id}
            firstname={user.firstname}
            lastname={user.lastname}
            phone={user.phone1}
            email={user.email1}
            editable={editable}
            editById={() => setEditID(i)}
            updateContact={contact => updateContact(contact, user.id)}
            deleteContact={() => deleteContact(user.id)}
            edit={i === editID}
            cancel={() => setEditID(null)}
          />
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#E8E8E8', '#FFF']} style={Styles.separator} />
        </View>
      ))}
    </View>
  );
};

ContactList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    phone1: PropTypes.string,
    email1: PropTypes.string,
  })).isRequired,
};

export default ContactList;
