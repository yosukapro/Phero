import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import ContactInput from 'components/ContactInput';
import LoadingButton from 'components/LoadingButton';

import Styles from './ContactForm.style';

const ContactForm = ({
  defaultFirstname = '',
  defaultLastname = '',
  defaultEmail = '',
  defaultPhone = '',
  submit,
  deleteContact,
  onCancel,
}) => {
  const [firstname, setFirstname] = useState(defaultFirstname);
  const [lastname, setLastname] = useState(defaultLastname);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const update = () => {
    // setIsLoading(true);
    submit({ firstname, lastname, email, phone });
  };

  return (
    <>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#E8E8E8', '#FFF']} style={Styles.separator} />
      <TouchableOpacity onPress={() => onCancel()} style={Styles.close}>
        <Image resizeMode='contain' source={require('assets/icons/close.png')} style={Styles.close} />
      </TouchableOpacity>
      <ContactInput label='Prénom' text={firstname} onChange={value => setFirstname(value)} isLock={!isLoading} />
      <ContactInput label='Nom' text={lastname} onChange={value => setLastname(value)} isLock={!isLoading} />
      <ContactInput label='Email' text={email} keyboardType='email-address' isRequired onChange={value => setEmail(value)} isLock={!isLoading} />
      <ContactInput label='Téléphone' text={phone} keyboardType='phone-pad' isRequired onChange={value => setPhone(value)} isLock={!isLoading} />
      <Text style={Styles.required}>* Au moins un des deux champs est obligatoire</Text>
      <View style={Styles.buttonContainer}>
        <LoadingButton text='ENREGISTRER' style={Styles.button} onPress={update} isLoading={isLoading} />
        { !isLoading && (
          <LoadingButton
            text='SUPPRIMER'
            style={[Styles.button, { marginVertical: 10 }]}
            onPress={deleteContact}
            isLoading={isLoading}
          />
        )}
      </View>
    </>
  );
};

ContactForm.propTypes = {
  defaultFirstname: PropTypes.string,
  defaultLastname: PropTypes.string,
  defaultEmail: PropTypes.string,
  defaultPhone: PropTypes.string,
  submit: PropTypes.func,
};


export default ContactForm;
