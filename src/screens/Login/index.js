import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Image, Text, View, Linking, TouchableOpacity, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from 'react-native-modest-checkbox';

import JWTService from 'services/JWT';
import { delUser, setUser } from 'store/actions/user';
import CustomInput from 'components/CustomInput';
import LoadingButton from 'components/LoadingButton';

import Styles from './Login.style';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  /**
   * if the user is redirect to login page with the logout parameter he will be disconnected
   */
  useEffect(() => {
    const logoutParams = navigation.getParam('logout');

    if (logoutParams) {
      JWTService.logout();
      dispatch(delUser());
      BackHandler.exitApp();
    }
  }, [dispatch, navigation]);

  /**
   * if the user is redirect to login page without the logout parameter
   * and had token stored he will be reconnected
   * Cannot use only one useEffect cause of bug
   */
  useEffect(() => {
    const logoutParams = navigation.getParam('logout');

    if (!logoutParams) {
      const token = JWTService.getToken();
      if (user && user.id && token) {
        navigation.navigate('Home');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchLogin = () => {
    setError('');
    setIsLogin(true);
    if (email !== '' && password !== '') {
      // Call JWT Service for sign in with credentials
      JWTService.signInWithCredentials(email, password)
        .then(userInformationsResponse => {
          console.log('Response', userInformationsResponse); // eslint-disable-line
          switch (userInformationsResponse.status) {
            case 200: {
              dispatch(setUser(userInformationsResponse.data.user));
              navigation.navigate('CapsPosition');
              setIsLogin(false);
              break;
            }
            case 401:
              throw new Error('Identifiants incorrect.');
            case 500:
              throw new Error('Erreur serveur. Code:500');
            default:
              throw new Error(`Erreur. Code:${userInformationsResponse.status}`);
          }
        })
        .catch(userInformationsError => {
          setError(userInformationsError.message);
          setIsLogin(false);
        });
    } else {
      setIsLogin(false);
      setError('Veuillez remplir les champs');
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={Styles.containerInputs} behavior='position' keyboardVerticalOffset={0}>
        <Image resizeMode='contain' source={require('assets/img/logo.png')} style={Styles.logo} />
        <View style={Styles.input}>
          <CustomInput onChange={value => setEmail(value)} placeholder='Email' keyboardType='email-address' text={email} />
        </View>
        <View style={Styles.input}>
          <CustomInput onChange={value => setPassword(value)} secure placeholder='********' text={password} />
        </View>
        <LoadingButton onPress={() => fetchLogin()} isLoading={isLogin} text='SE CONNECTER' style={Styles.button} />
        <Text style={Styles.errorMessage}>{error}</Text>
      </KeyboardAvoidingView>
      <View style={Styles.containerRemember}>
        <Checkbox
          customLabel={<Text style={Styles.textRemember}>Se souvenir de moi</Text>}
          checked={remember}
          onChange={value => setRemember(value.checked)}
        />
      </View>
      <Text style={Styles.version}>V2.1.0</Text>
      <TouchableOpacity onPress={() => { Linking.openURL('https://app-phero-test.demohc.com/resetPassword') }}>
        <Text style={Styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </>
  );
};

export default Login;
