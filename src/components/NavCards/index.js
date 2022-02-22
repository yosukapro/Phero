import React from 'react';
import { View } from 'react-native';

import { closeNav } from 'store/actions/nav';
import NavCard from 'components/NavCard';

import { useDispatch } from 'react-redux';
import Styles from './NavCards.style';

const NavCards = ({ navigation }) => {
  const dispatch = useDispatch();

  const redirect = path => {
    dispatch(closeNav());
    navigation.navigate(path);
  };

  return (
    <View style={Styles.container}>
      <NavCard image={require('assets/img/cardPairing.png')} onPress={() => redirect('Pairing')} text='Appairage' />
      <NavCard image={require('assets/img/cardProfile.png')} onPress={() => redirect('Profile')} text='Mon Profil' />
      <NavCard image={require('assets/img/cardAlert.png')} onPress={() => redirect('InfosAlerts')} text='Infos alertes' />
    </View>
  );
};
export default NavCards;
