import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './ProfileInformation.style';

const NavCard = ({ title, value }) => (
  <View style={Styles.container}>
    <Text style={Styles.title}>{title}</Text>
    <Text style={Styles.value}>{value}</Text>
  </View>
);

NavCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default NavCard;
