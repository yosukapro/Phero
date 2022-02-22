/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ToastAndroid, StyleSheet, View } from 'react-native';

import LoginScreen from '../../src/screens/Login';
import WelcomeScreen from '../../src/screens/Welcome';
import InfosAlertsScreen from '../../src/screens/InfosAlerts';

import LoadingButton from '../../src/components/LoadingButton';
import CustomInput from '../../src/components/CustomInput';
import NavCard from '../../src/components/NavCard';
import NavCards from '../../src/components/NavCards';
import AddButton from '../../src/components/AddButton';
import Contact from '../../src/components/Contact';
import ContactList from '../../src/components/ContactList';
import ScreenTitle from '../../src/components/ScreenTitle';
import ScreenTitleImage from '../../src/components/ScreenTitleImage';
import Header from '../../src/components/Header';
import ImageCapsPosition from '../../src/components/ImageCapsPosition';
import CapsCard from '../../src/components/CapsCard';
import CapsCardList from '../../src/components/CapsCardList';
import TabNav from '../../src/components/TabNav';
import TabNavBar from '../../src/components/TabNavBar';

const Styles = StyleSheet.create({
  centeredView :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  spacing: {
    marginBottom: 20,
  },
});

const CenteredView = ({ children }) => <View style={Styles.centeredView}>{children}</View>;

const testClick = () => {
  ToastAndroid.show('Clicked', 1000);
};

const users = [
  {
    firstName: 'Lucas',
    lastName: 'CAUSSAT',
    phone: '06 85 81 01 84',
    email: 'Lucas.caussat@humansconnexion.com',
  },
  {
    firstName: 'John',
    lastName: 'DOE',
    phone: '06 12 34 32 12',
    email: 'John.Doe@entreprise.tdl',
  },
  {
    firstName: 'other',
    lastName: 'USER',
    phone: '01 02 03 04 05',
    email: 'other.user@entreprisewithalonglongname.wouah',
  },
]

storiesOf('Component', module)
  .add('LoadingButton', () => (
    <CenteredView>
      <View style={Styles.spacing}>
        <LoadingButton minWidth={150} onPress={testClick} text='SE CONNECTER' />
      </View>
      <View style={Styles.spacing}>
        <LoadingButton
          isLoading
          minWidth={150}
          onPress={testClick}
          text='SE CONNECTER'
        />
      </View>
      <View style={Styles.spacing}>
        <LoadingButton
          background='#000'
          color='#FFF'
          onPress={testClick}
          isLoading
          text='Button Loading'
        />
      </View>
    </CenteredView>
  ))
  .add('CustomInput', () => (
    <CenteredView>
      <CustomInput placeholder='Email' keyboardType='email-address' />
      <CustomInput placeholder='********' />
    </CenteredView>
  ))
  .add('NavCard', () => (
    <CenteredView>
      <NavCard image={require('../../src/assets/img/cardPairing.png')} text='Appairage' onPress={testClick} style={{ width: '33%'}}/>
    </CenteredView>
  ))
  .add('NavCards', () => (
    <CenteredView>
      <NavCards />
    </CenteredView>
  ))
  .add('AddButton', () => (
    <CenteredView>
      <View style={Styles.spacing} >
        <AddButton />
      </View>
      <AddButton background={'orange'} color={'orange'} text={'SIMPLE TEXT'} style={Styles.spacing} />
    </CenteredView>
  ))
  .add('Contact', () => (
    <Contact label='CONTACT 1' firstName={'Lucas'} lastName={'CAUSSAT'} email={'lucas.caussat@humansconnexion.om'} phone={'06 85 81 01 84'}/>
  ))
  .add('ContactList', () => (
    <ContactList users={users} />
  ))
  .add('ScreenTitle', () => (
    <ScreenTitle text={'INFOS'} textBold={'ALERTES'} />
  ))
  .add('ScreenTitleImage', () => (
    <ScreenTitleImage text={'INFOS'} textBold={'ALERTES'} image={require('../../src/assets/img/infosAlerts.png')} />
  ))
  .add('Header', () => (
    <Header title='Title' />
  ))
  .add('ImageCapsPosition', () => (
    <ImageCapsPosition />
  ))
  .add('CapsCard', () => (
    <CapsCard text='Poigné' textBold='droit' />
  ))
  .add('CapsCardList', () => (
    <CapsCardList />
  ))
  .add('TabNav', () => (
    <TabNav image={require('../../src/assets/icons/home.png')} text='Mon profil' />
  ))
  .add('TabNav', () => (
    <TabNavBar />
  ))

storiesOf('Screen')
  .add('LoginScreen', () => (
    <LoginScreen />
  ))
  .add('WelcomeScreen', () => (
    <WelcomeScreen />
  ))
  .add('InfosAlertsScreen', () => (
    <InfosAlertsScreen employerContacts={users} />
  ))

