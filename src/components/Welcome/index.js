/* eslint-disable */
import React, { useEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';


import { useBLE } from 'providers/BLE';
import NavCards from 'components/NavCards';

import theme from 'theme';
import Styles from './Welcome.style';

const Welcome = ({ canClose = false, navigation, onClose, color = theme.primaryColor }) => {
  const user = useSelector(state => state.user);
  const { disconnectDevice } = useBLE();
  async function requestAll() {
    Platform.select({
      android: async () => {
        const coarseLocation = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        const location = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return { coarseLocation, location };
      },
      ios: () => {

      }
    })
  }

  useEffect(() => {
    requestAll().then(statuses => console.log(statuses)); // eslint-disable-line
  }, []);

  const RemoveCapsPosition = async () => {
    try {
      await AsyncStorage.removeItem('CapsPosition');
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  const logout = async () => {
    await RemoveCapsPosition();
    await disconnectDevice();
    await navigation.push('Login', { logout: true });
  };

  const closeButton = () => (
    <TouchableOpacity onPress={() => onClose()} style={Styles.close}>
      <Image resizeMode='contain' source={require('assets/icons/close.png')} style={Styles.close} />
    </TouchableOpacity>
  );

  return (
    <>
      <Image resizeMode='contain' source={require('assets/img/backgroundWelcome.png')} style={Styles.background} />
      <View style={Styles.heading}>
        {canClose && closeButton()}
      </View>
      <View style={Styles.logoContainer}>
        { !!user?.company?.logo && 
          <Image resizeMode='contain' source={{ uri: `https://phero-test.demohc.com${user.company.logo}` }} style={Styles.logo} />
        }
      </View>
      <View style={Styles.informations}>
        <Text style={Styles.welcomeText}>Bienvenue</Text>
        { user.team && 
        (
          <>
            <Text style={[Styles.name, { color }]}>{`${user.firstname} ${user.lastname.toUpperCase()}`}</Text>
            <Text style={Styles.team}>{user.team[0].name.toUpperCase()}</Text>
          </>
        )}
      </View>
      <NavCards navigation={navigation} />
      {/* <TouchableOpacity onPress={() => navigation.push('Logs')} style={Styles.disconnectContainer}>
          <Text>Voir les logs</Text>
      </TouchableOpacity> */}
      {
        !canClose && 
        (
          <TouchableOpacity onPress={logout} style={Styles.disconnectContainer}>
            <Image resizeMode='contain' source={require('assets/icons/logout.png')} style={Styles.disconnectIcon} />
            <Text style={Styles.disconnectText}>DECONNEXION</Text>
          </TouchableOpacity>
        )
      }
      <Image resizeMode='contain' source={require('assets/img/pheroPurpose.png')} style={Styles.phero} />
    </>
  );
};

Welcome.propTypes = {
  canClose: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onClose: PropTypes.func,
  color: PropTypes.string,
};

export default Welcome;
