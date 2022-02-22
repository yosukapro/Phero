import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';

import ImageCapsPosition from 'components/ImageCapsPosition';

import Styles from './CapsCard.style';

const CapsCard = ({ text, textBold, onClick }) => (
  <TouchableOpacity onPress={onClick}>
    <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} style={Styles.container}>
      <ImageCapsPosition />
      <View>
        <Text style={Styles.text}>{text}</Text>
        <Text style={Styles.textBold}>{textBold}</Text>
      </View>
    </CardView>
  </TouchableOpacity>
);

CapsCard.propTypes = {
  text: PropTypes.string,
  textBold: PropTypes.string,
  onClick: PropTypes.func,
};

export default CapsCard;
