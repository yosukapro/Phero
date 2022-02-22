import React, { useEffect } from 'react';
import Welcome from 'components/Welcome';
import { BackHandler } from 'react-native';

const Home = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, [])

  return (
    <>
      <Welcome navigation={navigation} />
    </>
  );
}

export default Home;
