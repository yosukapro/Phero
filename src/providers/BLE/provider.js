/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/*
| Developed by Redek Project
| Maintained by Lucas CAUSSAT
| Filename : provider.js
| Description : React Native Bluetooth Low Energy provider
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import React, { useState, useMemo, useEffect } from 'react';
import { Platform } from 'react-native'
import { BleManager } from 'react-native-ble-plx';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import API from 'services/API';
import PheroUtils from 'utils';
import BLEContext from './context';
import AsyncStorage from '@react-native-community/async-storage';

const BLEProvider = props => {
  const BLEManagerInstance = useMemo(() => new BleManager(), []);
  
  useEffect(() => {
    return () => {
      BLEManagerInstance.destroy();
    }
  }, []);
  const [userDisconnected, setUserDisconnected] = useState(false);
  const [monitoringSub, setMonitoringSub] = useState(null);
  const [onDisconnectedSub, setOnDisconnectedSub] = useState(null);
  const [deviceConnected, setDeviceConnected] = useState(null);
  const [service, setService] = useState(null);
  const [write, setWrite] = useState(null);
  const [read, setRead] = useState(null);
  const [battery, setBattery] = useState(null);

  /**
   * TOOD: Temporary notification methods
   * @param type
   */
  const notificate = type => {
    Platform.select({
      ios: () => {
        PushNotificationIOS.addNotificationRequest({
          title: type,
          body: type
        })
      },
      android: () => {
        PushNotification.localNotification({
          /* Android Only Properties */
          autoCancel: true, // (optional) default: true
          largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
          smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
          bigText: 'Information caps',
          subText: 'Information caps',
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
    })
  };

  /**
   * Try to connect device
   */
  const connectDevice = async device => (
    new Promise((resolve, reject) => {
      console.log(`Connecting to device: ${device.name}`, device); // ONLY FOR DEBUG

      // Connect this application with BLE device
      device.connect()
        .then(deviceData => {
          // Store device data in `deviceConnected`
          setDeviceConnected(deviceData);
          console.log('Device data: ', deviceData); // ONLY FOR DEBUG

          return deviceData.discoverAllServicesAndCharacteristics();
        })
        .then(async informations => {
          try {
            // Discover all services and characteristics
            console.log('Device service and characteristics: ', informations); // ONLY FOR DEBUG

            // Get all services and get `98140001-cb43-f388-6548-c8eb7b1eb60e` service
            const services = await informations.services();
            console.log('Services: ', services); // ONLY FOR DEBUG

            // Store `98140001-cb43-f388-6548-c8eb7b1eb60e` service in `service`
            setService(services[2]);

            // Get service characteristics
            const characteristics = await services[2].characteristics();
            console.log('Characteristics: ', characteristics); // ONLY FOR DEBUG

            // Store characteristics write and read data
            setWrite(characteristics[0]);
            setRead(characteristics[1]);

            // Resolve
            resolve();
          } catch (error) {
            console.error(error); // @TODO error gestion
            reject();
          }
        })
        .catch(error => {
          console.error(error); // @TODO error gestion
          reject();
        });
    })
  );

  /**
   * Write
   */
  const sendData = data => {
    BLEManagerInstance.writeCharacteristicWithResponseForDevice(
      deviceConnected.id,
      service.uuid,
      write.uuid,
      PheroUtils.hexToBase64(data),
    );
  };

  /**
   * Scan and connect
   */
  const scanAndConnect = deviceID => {
    console.log("User device ID", deviceID);
    if (BLEManagerInstance) {
      BLEManagerInstance.startDeviceScan(null, null, (error, device) => {
        console.log("Device scan", device);
        if (error) return;
        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (device.id === deviceID) {
          console.log(`Caps ${device.name} (#${device.id}) founded.`); // ONLY FOR DEBUG
          // Stop scanning as it's not necessary if you are scanning for one device.
          BLEManagerInstance.stopDeviceScan();
          // Connect device
          connectDevice(device).then(() => {
            notificate('Vous êtes sécurisé'); // @V2 SEND TO API
          });
        }
      });
    } else {
      console.warn('BLE Manager is not instancied.'); // @TODO hope it will never happend
    }
  };

  /**
   * Disconnect device
   */
  const disconnectDevice = () => {
    if (deviceConnected) {
      setUserDisconnected(true);
      notificate('Vous n\'êtes plus sécurisé');
      deviceConnected.cancelConnection();
    }
  };

  /**
   * Post new alert
   * @param alertType
   * @param content
   * @returns {Promise<AxiosResponse<T>>}
   */
  const postAlert = async (alertType, acceleration, content = 'alert') => {
    const pos = await getDataLastPos();
    return (
      API.post('alerts', {
        alertType,
        content,
        lng: pos[1],
        lat: pos[0],
        acceleration,
        user: '/api/users/3',
      })
    );
  }
  
  const getDataLastPos = async () => {
    try {
        const value = await AsyncStorage.getItem('gpsdata')
        if(value !== null) {
          val = await value.split('|');
          val = await val[val.length - 1].split(' ')
          return([val[7], val[4]]);
        } else {
            return '';
        }
    } catch(e) {
        console.error(e)
    }
  }

  useEffect(() => {
    if(battery && battery < 20) {
      notificate('Batterie faible, contactez un administrateur.')
    }
  }, [battery])

  /**
   * Will mount for auto connect at app launch
   * No used
   */
  // useEffect(() => {
  //   const subscription = BLEManagerInstance.onStateChange(state => {
  //     if (state === 'PoweredOn') {
  //       scanAndConnect('C3:F9:AA:D4:DC:69');
  //       subscription.remove();
  //     }
  //   }, true);

  //   return () => {
  //     BLEManagerInstance.destroy();
  //   };
  // }, [BLEManagerInstance, scanAndConnect]);

  /**
   * Read monitoring
   */
  useEffect(() => {
    // Check if device is connected
    console.log('start monitoring effect');
    if (deviceConnected && deviceConnected.id && read && monitoringSub === null) {
      deviceConnected.isConnected()
        .then(isConnected => {
          console.log('$$$$$$$$ MONITORING $$$$$$$$', isConnected);
          if (isConnected) {
            // Start read monitoring
            console.log('new monitoring');
            setMonitoringSub(read.monitor((error, characteristic) => {
              // Show error if exist
              // if (error) console.(error); // error gestion

              // Create alert type variable
              let alertType = null;

              // Define alert type with hex value
              const hexCharacteristicValue = PheroUtils.base64ToHex(characteristic.value);
              const splitedData = hexCharacteristicValue.match(/.{4}/g);
              let accel = null;
              if (splitedData[2] === 'dead') {
                notificate('Nouvelle information caps !')
                console.log('alert infos', splitedData[4], splitedData);
                accel = { X: splitedData[5], Y: splitedData[6], Z: splitedData[7] };
                switch (splitedData[4]) {
                  case '3333':
                    alertType = '1';
                    break;
                  case '2222':
                    alertType = '2';
                    break;
                  case '4444':
                    alertType = '3';
                    break;
                  case '5555':
                    alertType = '5';
                    break;
                  default:
                    console.log('UNKNOW ALERT :', hexCharacteristicValue);
                }
              } else {
                console.log('datas', splitedData[2]);
                switch (splitedData[2]) {
                  case '5555': // status
                    setBattery(parseInt(splitedData[splitedData.length - 2], 16));
                    API.post('caps-battery', {
                      battery: parseInt(splitedData[splitedData.length - 2], 16),
                    })
                      .then(() => {
                        console.log('battery updated');
                      })
                      .catch(e => console.error(e));
                    // request api
                    break;
                  default:
                    console.log('UNKNOW COMMAND :', hexCharacteristicValue);
                }
              }

              // If alert type is defined, notificate user and post alert
              if (alertType !== null) {
                // Notificate user
                console.log('Notifié'); // ONLY FOR DEBUG
                
                // Post alert
                postAlert(alertType, accel)
                  .then(responseAlert => {
                    notificate(responseAlert.data.alertType.type);
                    alertType = null;
                    console.log('Response alert: ', responseAlert); // ONLY FOR DEBUG
                  })
                  .catch(e => {
                    notificate('Vous n\'êtes plus sécurisé, merci de vous reconnecter');
                    console.error('3e', e.message, e); // @TODO error gestion
                  });
              }
            }));
            sendData('CAFEFACE555500020000');
          }
        })
        .catch(error => console.error('4', error)); // @TODO error gestion
    }

    if (monitoringSub !== null && deviceConnected === null && read === null) {
      monitoringSub.remove();
      setMonitoringSub(null);
      console.log('Monitoring removed');
    }

    // Remove subscription if this application is exit
    // seem useless && making troubles
    // return () => {
    //   if (deviceConnected && deviceConnected.id && monitoringSub) {
    //     console.log('ici');
    //     monitoringSub.remove();
    //   }
    // };
  }, [read]);

  /**
   * Check if current device connected is disconnected
   */
  useEffect(() => {
    // Check if device is connected
    if (deviceConnected && deviceConnected.id && onDisconnectedSub === null) {
      setOnDisconnectedSub(deviceConnected.onDisconnected(
        (error, device) => { // eslint-disable-line
          notificate('Vous n\'êtes plus sécurisé');
          console.log('Disconnect handle', error);
          if (error) {
            console.log('Disconnect error', error);
            scanAndConnect(device.id);
            postAlert(4)
              .then(responseAlert => {
                notificate(responseAlert.data.alertType.type);
                console.log('Response alert: ', responseAlert); // ONLY FOR DEBUG
              })
              .catch(e => {
                console.error('3', e); // @TODO error gestion
              });
          }

          if (monitoringSub !== null) {
            console.log('Remove monitoring sub');
            monitoringSub.remove();
            setMonitoringSub(null);
          }
          setDeviceConnected(null);
          setService(null);
          setWrite(null);
          setRead(null);
          setBattery(null);
        },
      ));
    }

    return () => {
      if (deviceConnected && deviceConnected.id && onDisconnectedSub) {
        onDisconnectedSub.remove();
      }
    };
  }, [deviceConnected]);

  useEffect(() => {
    console.log('$$$$$$$$ DISCONNECTING EFFECT $$$$$$$$');
    if (userDisconnected) {
      console.log('$$$$$$$$ BY USER $$$$$$$$');
      if (onDisconnectedSub !== null) {
        onDisconnectedSub.remove();
        setOnDisconnectedSub(null);
      }
      if (monitoringSub !== null) {
        monitoringSub.remove();
        setMonitoringSub(null);
      }
      setDeviceConnected(null);
      setService(null);
      setWrite(null);
      setRead(null);
      setUserDisconnected(false);
    } else {
      console.log('$$$$$$$$ AUTO $$$$$$$$');
    }
  }, [userDisconnected]);

  /**
   * Return provider
   */
  return (
    <BLEContext.Provider
      value={{
        BLEManagerInstance,
        postAlert,
        scanAndConnect,
        sendData,
        disconnectDevice,
        deviceConnected,
        service,
        write,
        read,
        battery,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </BLEContext.Provider>
  );
};

export default BLEProvider;
