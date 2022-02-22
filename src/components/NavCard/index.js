import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';

import Styles from './NavCard.style';

const NavCard = ({ image, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={Styles.container}>
    <CardView cardElevation={6} cardMaxElevation={6} cornerRadius={10}>
      <Image resizeMode='contain' source={image} style={Styles.image} />
      <Text numberOfLines={1} ellipsizeMode='clip' style={Styles.text}>{text}</Text>
    </CardView>
  </TouchableOpacity>
);

NavCard.propTypes = {
  image: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default NavCard;
