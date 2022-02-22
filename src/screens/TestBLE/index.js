/* eslint-disable */
// TEMP CONFIGURATION BLE PAGE (+ loading)
import React from 'react';
import { Button, Animated, Easing, View } from 'react-native';
import PushNotification from 'react-native-push-notification';


import { Buffer } from 'buffer';
import { BleManager } from 'react-native-ble-plx';
import { postAlert } from 'services/API/Caps';

let deviceConnected = {};
let service = {};
let write = {};
let read = {};
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODE5MzMwMTcsImV4cCI6MTU4MTkzNjYxOCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibHVjYXMuY2F1c3NhdEBodW1hbnNjb25uZXhpb24uY29tIn0.ku2lo0y_c29NPfHCxjhkcvCo8J01KEgT9aqw7v5jeO6lxU50bBvTaV1w8UiSL0ddhrgRkjQT6RBZvtFO9iCOxLzwnLRwOw80XE6MZ-ZACcCRELMODDeKxGU2SWgEL2Rk6AmAZ1bQzfqmDNjhDvWITsQPHulDuuNdmvUC18Ea1GXA5UCr-HEQV54YhUlIbX6UnixYRdlTJwLwJerPIdGXjp0hwGyJxSczIRViTX1cu4-Inc6x8m1lBeCMAMhFtDwzeIy_JWpw5lTtVpSfHt3CKe1RJPvEEkZtPEOPijt4DS9voZuEexL_z7zZmMXKI5A4Bi_S6FQTilp87OeMyTN8JNBJUtUtIhtbYHL0NK0t60UJKkMu-1s68L4DhzUZ3jaHqG72Py96tqwhr9jM0q6F10CvcOCX732PQ91chGFMUagzn02ifBLnRBCUJCUe4BGEjKQHvGH7s5MOOxpJ70hYGGbzyLwhTIs_gxJ0yS_Pxd5toEvX95rE-ac3RxZlWa5PW_PtZoTEZZCzyOf_HuZiytdjOGlQOfOPk8Sq7T0qYKiZ6g9_UzouwcfQHAA78F10IvGC90gufnXYeW7P5_GjdUO2rSeyGAupmVpTQxnihGFC-gngyDuVI79VRDOaPUj4YEV7hgGKt5yakt8dvwy443Q4YeusN8JXZ1r9YK2WK48"

const TestBLE = () => {
  const ble = new BleManager();

  const notificate = type => {
    PushNotification.localNotification({
      /* Android Only Properties */
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
      smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
      bigText: 'description',
      subText: 'seconde description',
      color: 'red',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'phero',
      ongoing: false,
      priority: 'high',
      visibility: 'private',
      importance: 'high',

      /* iOS only properties */
      // alertAction: // (opt @ional) default: view
      // category: // (optional) default: null
      // userInfo: // (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title: type,
      message: 'Information caps',
      playSound: false, // a voir
      soundName: 'default',
      number: '10',
      // actions: '["Yes", "No"]',
    });
  }

  const hexToBase64 = hex => (new Buffer.from(hex, 'hex').toString('base64')) //eslint-disable-line
  const base64ToHex = base64 => (new Buffer.from(base64, 'base64').toString('hex')) //eslint-disable-line
  const decToHex = dec => (dec.toString(16).toUpperCase())

  const spinValue = new Animated.Value(0)

  const Animation = Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1500,
        isInteraction: false,
        useNativeDriver: true,
        easing: Easing.linear,
      },
    ),
  )

  const start = () => {
    Animation.start();
  }

  const stop = () => {
    Animation.stop();
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const connectDevice = device => {
    console.log(`Connecting to device: ${device.name}`)
    console.log(device);
    ble.connectToDevice(device.id)
      .then(deviceData => {
        console.log('data :', deviceData);
        deviceConnected = deviceData;
        // deviceData.discoverAllServicesAndCharacteristics();
      })
      .then(() => {
        ble.discoverAllServicesAndCharacteristicsForDevice(device.id)
          .then(informations => informations.services()
            .then(services => {
              console.log('Recovery services')
              service = services[2]; //eslint-disable-line
              // 98140001-cb43-f388-6548-c8eb7b1eb60e
              services[2].characteristics()
                .then(characteristics => {
                  console.log('Recovery characteristics')
                  write = characteristics[0]; //eslint-disable-line
                  read = characteristics[1]; //eslint-disable-line
                });
            }));
      })
  };

  const stopScan = () => {
    console.log('Stopping scan devices')
    ble.stopDeviceScan();
  };

  const showBLE = () => {
    console.log('Start scan devices')
    ble.startDeviceScan(null, null, (error, device) => {
      if (error) return console.log(error);
      console.log(device);
      // new : C3:F9:AA:D4:DC:69
      // Vibreur : CD:BA:DF:24:4D:42
      if (device.name === 'HumanCo') {
        console.log('Caps found');
        stopScan();
        connectDevice(device);
      }
      return true;
    })
  }

  const scanBLE = () => {
    console.log('Start scan devices')
    ble.startDeviceScan(null, null, (error, device) => {
      if (error) return console.log(error);
      console.log(device);
      return true;
    })
  }

  const sendData = trame => {
    // generateCRC
    console.log(`Send data: ${trame}`);
    ble.writeCharacteristicWithResponseForDevice(
      deviceConnected.id,
      service.uuid,
      write.uuid,
      hexToBase64(trame),
    )
  }

  const showInformations = () => {
    console.log(`Informations for ${deviceConnected.name}`);
    console.log(deviceConnected, service, write, read);
  }

  const disconnect = () => {
    console.log(`Disconnect ${deviceConnected.name}`)
    ble.cancelDeviceConnection(deviceConnected.id);
  }

  const monitoring = () => {
    let alertType = null;
    console.log('Monitoring');
    read.monitor((error, characteristic) => {
    alertType = null;
      switch(base64ToHex(characteristic.value)) {
        case 'facecafedead000422221aa1' :
          alertType = 'Appuis bouton'
          break;
        case 'facecafedead0004333328f3' :
          alertType = 'Chute'
          break;
        case 'facecafedead00044444b74d' :
          alertType = 'Immobilité anormale'
          break;
        default :
          alertType = null;
      }
      if (alertType != null) {
        notificate(alertType);
        console.log('notifié');
        postAlert(token, alertType)
          .then(responseAlert => {
            console.log(responseAlert);
            switch (responseAlert.status) {
              case 201:
                responseAlert.json()
                  .then(data => {
                    console.log('CHUTE ALERTÉ', data)
                  });
                break;
              default:
                throw new Error(`OUI. Code:${responseAlert.status}`);
            }
          })
          .catch(e => {
            console.log('NON', e);
          });
        }
      console.log('Response data: ', base64ToHex(characteristic.value));
    });
  }

  const converTime = () => {
    let hexTime = decToHex(Date.now());
    while (hexTime.length < 16) {
      hexTime = `0${hexTime}`
    }
    return hexTime;
  }

  return (
    <>
      <Button onPress={() => showBLE()} title='Autoconnect' />
      <Button onPress={() => scanBLE()} title='STARTSCAN' />
      <Button onPress={() => showInformations()} title='Informations' />
      <Button onPress={() => monitoring()} title='Monitoring datas' />
      <Button onPress={() => sendData('CAFEFACEAAAA00020000')} title='Auto-test' />
      <Button onPress={() => sendData('CAFEFACE555500020000')} title='Demande status' />
      <Button onPress={() => sendData(`CAFEFACEDADE0006${converTime()}0000`)} title='Mise a jour date' />
      <Button onPress={() => sendData(`CAFEFACECCCC00020000`)} title='VIBREUR' />
      <Button onPress={() => converTime()} title='Format time' />
      <Button onPress={() => stopScan()} title='stopScan' />
      <Button onPress={() => disconnect()} title='Disconnect' />
      {/* <Button onPress={() => start()} title='Start loading' />
      <Button onPress={() => stop()} title='Stop Loading' /> */}
      {/* <View style={{ backgroundColor: 'red', width: 50, height: 50 }}>
        <Animated.Image
          style={{ width: 150, height: 165, transform: [{ rotate: spin }] }}
          source={require('assets/img/loading.png')}
        />
      </View> */}
    </>
  );
}

export default TestBLE;
