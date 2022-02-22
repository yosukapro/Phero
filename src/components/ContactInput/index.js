import React from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './ContactInput.style';

const CustomInput = ({
  defaultText = '',
  keyboardType = 'default',
  onChange,
  returnKeyType = 'done',
  secure = false,
  submit,
  text = '',
  label,
  isRequired = false,
  isLock = false,
}) => (
  <View style={Styles.container}>
    <Text style={Styles.label}>{label} {isRequired && '*'}</Text>
    <TextInput
      allowFontScaling
      autoCapitalize='none'
      autoCorrect={false}
      defaultValue={defaultText}
      keyboardType={keyboardType}
      onChangeText={newText => onChange(newText)}
      onSubmitEditing={submit}
      placeholder={label}
      placeholderTextColor='black'
      returnKeyType={returnKeyType}
      secureTextEntry={secure}
      style={Styles.input}
      editable={isLock}
      value={text}
    />
  </View>
);

CustomInput.propTypes = {
  defaultText: PropTypes.string,
  keyboardType: PropTypes.string,
  onChange: PropTypes.func,
  returnKeyType: PropTypes.string,
  secure: PropTypes.bool,
  submit: PropTypes.func,
  text: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default CustomInput;
