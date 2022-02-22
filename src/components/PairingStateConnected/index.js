import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { useBLE } from 'providers/BLE';
import ScreenTitle from 'components/ScreenTitle';
import LoadingButton from 'components/LoadingButton';
import BatteryInfo from 'components/BatteryInfo';

import Styles from './PairingStateConnected.style';

const PairingStateConnecting = ({ text, textBold, color, disconnectCaps }) => {
  const { sendData, battery } = useBLE();

  const autoTest = () => {
    sendData('CAFEFACEAAAA00020000');
  };

  return (
    <>
      <View style={Styles.container}>
        <ScreenTitle text={text} textBold={textBold} color={color} />
        <BatteryInfo battery={battery} />
        <Image resizeMode='contain' source={require('assets/img/secure.png')} style={Styles.image} />
        <TouchableOpacity style={Styles.test} onPress={autoTest}>
          <Text style={{ color: 'white' }}>AUTO TEST</Text>
        </TouchableOpacity>
      </View>
      <LoadingButton onPress={disconnectCaps} isLoading={false} text='DÉCONNECTER' style={Styles.button} />
    </>
  );
};

PairingStateConnecting.propTypes = {
  text: PropTypes.string.isRequired,
  textBold: PropTypes.string.isRequired,
  disconnectCaps: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default PairingStateConnecting;
