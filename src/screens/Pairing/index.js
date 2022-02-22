import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from 'components/Header';
import NavBar from 'components/NavBar';
import Nav from 'components/Nav';
import PairingState from 'components/PairingState';
import { closeNav } from 'store/actions/nav';

const Pairing = ({ navigation }) => {
  const dispatch = useDispatch;
  const navState = useSelector(state => state.nav);

  return (
    <>
      <Header navigation={navigation} title='Appairage' />
      <PairingState textBold='APPAIRAGE' />
      <Nav navigation={navigation} onClose={() => dispatch(closeNav())} show={navState} />
      <NavBar navigation={navigation} isActive='pairing' />
    </>
  );
};

export default Pairing;
