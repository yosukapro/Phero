import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { openNav } from 'store/actions/nav';
import { useDispatch } from 'react-redux';
import Styles from './Header.style';

const Header = ({ navigation, title }) => {
  const dispatch = useDispatch();

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('assets/icons/backNav.png')} />
      </TouchableOpacity>
      <Text style={Styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => dispatch(openNav())}>
        <Image source={require('assets/icons/nav.png')} />
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
