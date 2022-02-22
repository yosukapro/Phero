import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';
import Styles from './CustomInput.style';

const CustomInput = ({
  color = theme.primaryColor,
  defaultText = '',
  keyboardType = 'default',
  onChange,
  placeholder = '',
  returnKeyType = 'done',
  secure = false,
  submit,
  text = '',
}) => (
  <View style={Styles.container}>
    <TextInput
      allowFontScaling
      autoCapitalize='none'
      autoCorrect={false}
      defaultValue={defaultText}
      keyboardType={keyboardType}
      onChangeText={newText => onChange(newText)}
      onSubmitEditing={submit}
      placeholder={placeholder}
      placeholderTextColor={color}
      returnKeyType={returnKeyType}
      secureTextEntry={secure}
      style={Styles.input}
      value={text}
    />
  </View>
);

CustomInput.propTypes = {
  color: PropTypes.string,
  defaultText: PropTypes.string,
  keyboardType: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  secure: PropTypes.bool,
  submit: PropTypes.func,
  text: PropTypes.string,
};

export default CustomInput;
