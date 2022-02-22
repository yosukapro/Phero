import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar } from 'react-native';

import store from 'store';
import AppNavigator from 'AppNavigator';
import Auth from 'providers/Auth';
import { BLEProvider } from 'providers/BLE';
import { GPSProvider } from './providers/GPS';

const App = () => (
  <>
    <StatusBar />
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Auth>
          <GPSProvider>
            <BLEProvider>
              <AppNavigator />
            </BLEProvider>
          </GPSProvider>
        </Auth>
      </Provider>
    </SafeAreaView>
  </>
);

export default App;
