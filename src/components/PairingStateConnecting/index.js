import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import ScreenTitle from 'components/ScreenTitle';

import Styles from './PairingStateConnecting.style';

const PairingStateConnecting = ({ text, textBold, color }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1500,
        isInteraction: false,
        useNativeDriver: true,
        easing: Easing.linear,
      },
    ),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={Styles.container}>
      <ScreenTitle text={text} textBold={textBold} color={color} />
      <Animated.Image
        style={[Styles.loading, { transform: [{ rotate: spin }] }]}
        source={require('assets/img/loading.png')}
      />
      <Text style={Styles.waitingText}>MERCI DE PATIENTER</Text>
    </View>
  );
};

PairingStateConnecting.propTypes = {
  text: PropTypes.string.isRequired,
  textBold: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default PairingStateConnecting;
