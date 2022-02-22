import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import NavBarItem from 'components/NavBarItem';

import Styles from './NavBar.style';

const NavBar = ({ navigation, isActive }) => (
  <View style={Styles.container}>
    <NavBarItem onPress={() => navigation.replace('Home')} text='Accueil' icon={require('assets/icons/home.png')} active={isActive === 'home'} />
    <NavBarItem onPress={() => navigation.replace('Pairing')} text='Appairage' icon={require('assets/icons/pairing.png')} active={isActive === 'pairing'} />
    <NavBarItem onPress={() => navigation.replace('Profile')} text='Mon profil' icon={require('assets/icons/profile.png')} active={isActive === 'profile'} />
    <NavBarItem onPress={() => navigation.replace('InfosAlerts')} text='Infos alertes' icon={require('assets/icons/alerts.png')} active={isActive === 'alert'} />
  </View>
);

NavBar.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  isActive: PropTypes.string,
};

export default NavBar;
