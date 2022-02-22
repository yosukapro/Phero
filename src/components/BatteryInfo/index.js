import React from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './BatteryInfo.style';

const BatteryInfo = ({ battery }) => (
  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
    <Image resizeMode='contain' source={require('assets/icons/battery.png')} style={Styles.icon} />
    <View style={{ padding: 10, justifyContent: 'center' }}>
      <Text style={Styles.textBold}>Batterie</Text>
      <Text style={Styles.text}>{battery}%</Text>
    </View>
  </View>
);

BatteryInfo.propTypes = {
  battery: PropTypes.number,
};

export default BatteryInfo;
