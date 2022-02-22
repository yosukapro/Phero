import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from 'components/Header';
import NavBar from 'components/NavBar';
import Nav from 'components/Nav';
import { closeNav } from 'store/actions/nav';
import ScreenTitleImage from 'components/ScreenTitleImage';
import CapsCard from 'components/CapsCard';
import ProfileInformation from 'components/ProfileInformation';

import Styles from './Profile.style';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const navState = useSelector(state => state.nav);
  const user = useSelector(state => state.user);
  const [capsPosition, setCapsPosition] = useState({ text: 'Loading', textBold: 'Loading' });

  const getCapsPosition = async () => {
    try {
      const value = await AsyncStorage.getItem('CapsPosition');
      if (value !== null) {
        let text = null;
        let textBold = null;
        switch (value) {
          case 'right':
            text = 'Bras';
            textBold = 'Droit';
            break;
          case 'left':
            text = 'Bras';
            textBold = 'Gauche';
            break;
          case 'belt':
            text = 'Accroche';
            textBold = 'Ceinture';
            break;
          default:
            console.log('Problème positionnement caps'); // eslint-disable-line
        }
        setCapsPosition({ text, textBold });
      } else {
        navigation.navigate('CapsPosition');
      }
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    getCapsPosition();
  }, [capsPosition]); // eslint-disable-line

  return (
    <>
      <ScrollView style={Styles.container}>
        <Header navigation={navigation} title='Mon Profil' />
        <ScreenTitleImage text='MON' textBold='PROFIL' image={require('assets/img/infosAlerts.png')} />
        <Text style={Styles.title}>POSITIONNEMENT DE MA CAPS</Text>
        <CapsCard text={capsPosition.text} textBold={capsPosition.textBold} onClick={() => navigation.navigate('CapsPosition', { goBack: true })} />
        <Text style={Styles.title}>MES INFORMATIONS</Text>
        <ProfileInformation title='PRÉNOM' value={user.firstname} />
        <View style={Styles.separator} />
        <ProfileInformation title='NOM' value={user.lastname} />
        <View style={Styles.separator} />
        <ProfileInformation title='E-MAIL' value={user.email} />
        <View style={Styles.separator} />
        <ProfileInformation title='ENTREPRISE' value={user.company.name} />
        <View style={Styles.separator} />
        <ProfileInformation title='ÉQUIPE' value={user.team[0].name} />
        <View style={Styles.separator} />
        <ProfileInformation title='FONCTION' value={user.profession} />
        <View style={Styles.spacing} />
      </ScrollView>
      <Nav navigation={navigation} onClose={() => dispatch(closeNav())} show={navState} />
      <NavBar navigation={navigation} isActive='profile' />
    </>
  );
};

export default Profile;
