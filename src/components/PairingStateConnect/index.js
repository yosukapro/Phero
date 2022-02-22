import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import ScreenTitle from 'components/ScreenTitle';
import LoadingButton from 'components/LoadingButton';

import Styles from './PairingStateConnect.style';

const PairingStateConnect = ({ textBold, color, connectCaps, description, isLoading }) => (
  <>
    <View style={Styles.container}>
      <ScreenTitle textBold={textBold} color={color} />
      <Text style={Styles.descriptionText}>{description}</Text>
      <Image resizeMode='contain' source={require('assets/img/pairing.png')} style={Styles.image} />
    </View>
    <LoadingButton onPress={connectCaps} isLoading={isLoading} text='CONNEXION' color='white' style={Styles.button} />
  </>
);

PairingStateConnect.propTypes = {
  textBold: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  connectCaps: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PairingStateConnect;
