import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ScreenTitleImage from 'components/ScreenTitleImage';
import CapsCard from 'components/CapsCard';
import Styles from './CapsPosition.style';

const Home = ({ navigation }) => {
  const setCapsPosition = async position => {
    try {
      await AsyncStorage.setItem('CapsPosition', position);
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  const redirect = async position => {
    await setCapsPosition(position);
    await console.log('Position set : ', position); //eslint-disable-line
    if (!navigation.getParam('goBack')) {
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={Styles.background}>
      <View style={Styles.container}>
        <ScreenTitleImage text='LOCALISATION' textBold='DE VOTRE CAPS' />
        <Text style={Styles.text}>Où portez-vous votre caps de sécurité ?</Text>
      </View>
      <CapsCard onClick={() => redirect('right')} text='Bras' textBold='Droit' />
      <CapsCard onClick={() => redirect('left')} text='Bras' textBold='Gauche' />
      <CapsCard onClick={() => redirect('belt')} text='Accroche' textBold='Ceinture' />
    </ScrollView>
  );
};

export default Home;
