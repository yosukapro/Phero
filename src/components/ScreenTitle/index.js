import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';
import Styles from './ScreenTitle.style';

const ScreenTitle = ({ color = theme.primaryColor, text = '', textBold = '' }) => (
  <View>
    {text !== '' && <Text style={Styles.title}>{text}</Text>}
    {textBold !== '' && <Text style={Styles.titleBold}>{textBold}</Text>}
    <View style={[Styles.separator, { backgroundColor: color }]} />
  </View>
);

ScreenTitle.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  textBold: PropTypes.string.isRequired,
};

export default ScreenTitle;
