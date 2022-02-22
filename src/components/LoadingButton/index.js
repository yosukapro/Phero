import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';
import Styles from './LoadingButton.style';

const LoadingButton = ({
  background = theme.buttonBackgroundDefault,
  color = theme.buttonFontColorDefault,
  isLoading = false,
  minWidth = 0,
  onPress,
  style,
  text,
}) => (
  <TouchableOpacity
    style={[Styles.container, { backgroundColor: background, minWidth }, style]}
    disabled={isLoading}
    onPress={onPress}
  >
    {isLoading ? (
      <ActivityIndicator size={24} color={color} />
    ) : (
      <Text style={[Styles.text, { color }]}>{text}</Text>
    )}
  </TouchableOpacity>
);

LoadingButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  minWidth: PropTypes.number,
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default LoadingButton;
