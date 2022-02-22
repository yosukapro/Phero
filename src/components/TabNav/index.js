import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './TabNav.style';

const TabNav = ({ image, text }) => (
  <TouchableOpacity style={Styles.container}>
    <Image resizeMode='contain' source={image} style={Styles.image} />
    <Text style={Styles.text}>{text}</Text>
  </TouchableOpacity>
);

TabNav.propTypes = {
  image: PropTypes.func,
  text: PropTypes.string,
};

export default TabNav;
