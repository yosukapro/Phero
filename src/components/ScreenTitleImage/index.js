import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import ScreenTitle from 'components/ScreenTitle';

import theme from 'theme';
import Styles from './ScreenTitleImage.style';

const ScreenTitleImage = ({ color = theme.primaryColor, image, text, textBold }) => (
  <View style={Styles.container}>
    <ScreenTitle text={text} textBold={textBold} color={color} />
    <View style={Styles.imageContainer}>
      <Image resizeMode='contain' source={image} style={Styles.image} />
    </View>
  </View>
);

ScreenTitleImage.propTypes = {
  color: PropTypes.string,
  image: PropTypes.number,
  text: PropTypes.string.isRequired,
  textBold: PropTypes.string.isRequired,
};

export default ScreenTitleImage;
