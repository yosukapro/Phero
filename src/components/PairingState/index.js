import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useBLE } from 'providers/BLE';
import { useGPS } from 'providers/GPS';  
import PairingStateConnect from 'components/PairingStateConnect';
import PairingStateConnecting from 'components/PairingStateConnecting';
import PairingStateConnected from 'components/PairingStateConnected';

const PairingState = ({ textBold }) => {
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false); // eslint-disable-line
  const {
    BLEManagerInstance,
    read,
    scanAndConnect,
    deviceConnected,
    disconnectDevice,
  } = useBLE();

  const { startTracking, stopTracking } = useGPS();

  const connectCaps = () => {
    if (BLEManagerInstance) {
      setIsLoading(true);
      startTracking();
      scanAndConnect(user.caps.number);
    }
  };

  const disconnectCaps = () => {
    setIsProcessing(true);
    stopTracking();
    disconnectDevice();
  };

  useEffect(() => {
    if (read) {
      setIsLoading(false);
      setIsConnected(true);
      // eslint-disable-next-line no-console
      console.log('******************** STOP LOADING ***********************$');
    }
  }, [read]);

  useEffect(() => {
    if (deviceConnected === null) {
      setIsConnected(false);
      setIsProcessing(false);
      setIsLoading(false);
    }
  }, [deviceConnected]);

  const description = 'Connectez-vous à la caps pour déclencher une alerte en cas de problème et assurer votre sécurité';

  const render = () => {
    /**
     * Default state
     */
    let state = (
      user?.caps?.number ? (
        <PairingStateConnect
          textBold={textBold}
          connectCaps={connectCaps}
          description={description}
          isLoading={isProcessing}
        />
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <Text style={{ textAlign: 'center', color: 'red', margin: 30, fontSize: 25 }}>Pas de caps assignée, reconnectez l'utilisateur une fois la caps attribuée.</Text>
      )
    );

    /**
     * Connecting
     * @TODO Add timeout
     */
    if (isLoading && !isConnected && !isDisconnected) {
      state = (
        <PairingStateConnecting
          text='APPAIRAGE'
          textBold='EN COURS'
        />
      );
    }

    /**
     * Connected
     */
    if (isConnected && !isDisconnected && !isLoading) {
      state = (
        <PairingStateConnected
          text='VOUS ÊTES'
          textBold='SÉCURISÉ'
          disconnectCaps={disconnectCaps}
          isLoading={isProcessing}
        />
      );
    }

    /**
     * Disconnected
     */
    if (isDisconnected) {
      // eslint-disable-next-line no-console
      console.log('ERROR BLE'); // @TODO error gestion
    }

    return state;
  };

  return (
    <ScrollView style={{ marginBottom: 100 }}>
      {render()}
    </ScrollView>
  );
};

PairingStateConnect.propTypes = {
  textBold: PropTypes.string.isRequired,
};

export default PairingState;
