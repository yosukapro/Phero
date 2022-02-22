import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';
import Styles from './AddButton.style';

const AddButton = ({
  background = theme.primaryColor,
  color = theme.primaryColor,
  onPress,
  text = 'AJOUTER UN CONTACT',
}) => (
  <TouchableOpacity
    style={[Styles.container]}
    onPress={onPress}
  >
    <View style={[Styles.buttonContainer, { backgroundColor: background }]}>
      <Image resizeMode='contain' source={require('assets/img/addButton.png')} style={Styles.image} />
    </View>
    <Text style={[Styles.text, { color }]}>{text}</Text>
  </TouchableOpacity>
);

AddButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default AddButton;
