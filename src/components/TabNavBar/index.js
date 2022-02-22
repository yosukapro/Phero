import React from 'react';
import { View } from 'react-native';

import TabNav from 'components/TabNav';

import Styles from './TabNavBar.style';

const TabNavBar = () => (
  <View style={Styles.container}>
    <View style={Styles.nav}>
      <TabNav image={require('assets/icons/home.png')} text='Accueil' />
      <TabNav image={require('assets/icons/pairing.png')} text='Appairage' />
      <TabNav image={require('assets/icons/profile.png')} text='Mon profil' />
      <TabNav image={require('assets/icons/alerts.png')} text='Infos alertes' />
    </View>
    <View style={Styles.bottomLine} />
  </View>
);

export default TabNavBar;
