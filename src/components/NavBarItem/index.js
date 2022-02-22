import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';

import Styles from './NavBarItem.style';


const NavBarItem = ({ icon, text, active = false, onPress }) => (
  <TouchableOpacity
    style={[
      Styles.container,
      { backgroundColor: active && theme.backgroundLightGrey },
    ]}
    onPress={onPress}
  >
    <Image resizeMode='contain' source={icon} style={Styles.icon} />
    <Text style={[Styles.text, { color: active ? theme.primaryColor : theme.fontColorGrey }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

NavBarItem.propTypes = {
  icon: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default NavBarItem;
