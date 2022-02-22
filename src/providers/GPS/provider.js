/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import PushNotification from 'react-native-push-notification';
import GPSContext from './context';
import AsyncStorage from '@react-native-community/async-storage';

const GPSProvider = props => {
    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Vous êtes sécurisé',
            notificationText: 'Phero caps tourne en arrière plan',
            debug: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            startForeground: true,
        });
        return() => {
            BackgroundGeolocation.removeAllListeners();
        }
    }, [])

    const notificate = (type, message = '') => {
        PushNotification.localNotification({
          autoCancel: true,
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_notification',
          bigText: message,
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
          title: type,
          message: JSON.stringify(message),
        });
    };

    const storeData = async (value, key) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.error(JSON.stringify(e))
        }
    }
   
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('gpsdata')
            if(value !== null) {
                return value;
            } else {
                return '';
            }
        } catch(e) {
            console.error(JSON.stringify(e))
        }
    }

    const format = (data, newValue) => {
        data = data.split('|')
        if(typeof data === 'string') {
            data = []
        } else if (data.length > 60) {
            data.shift();
        }
        data.push(newValue)
        data = data.join('|');
        return data;
    }

    const addLog = async (newValue) => {
        try {
            let data = await getData();
            val = await format(data, newValue);
            await storeData(val, 'gpsdata');
            // await notificate('log added', newValue)
        } catch(e) {
            console.log('test', JSON.stringify(e))
        }
    }

    BackgroundGeolocation.on('location', (location) => {
        BackgroundGeolocation.startTask(async taskKey => {
            // notificate('Nouvelle locationn : ', location);
            let d = new Date();
            await addLog(d.getDate() + '/' + d.getMonth() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' lat : ' + location.longitude + ' long : ' + location.latitude);
            console.log(d.getDate() + '/' + d.getMonth() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' lat : ' + location.longitude + ' long : ' + location.latitude);
            BackgroundGeolocation.endTask(taskKey);
        });
    })

    BackgroundGeolocation.on('error', (error) => {
        // notificate('[ERROR] BackgroundGeolocation error:', error);
        console.log('[ERROR] BackgroundGeolocation error:', error);
    });
    
    BackgroundGeolocation.on('start', () => {
        // notificate('[INFO] BackgroundGeolocation service has been started');
        console.log('[INFO] BackgroundGeolocation service has been started');
    });
    
    BackgroundGeolocation.on('stop', () => {
        // notificate('[INFO] BackgroundGeolocation service has been stopped');
        console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    const startTracking = () => {
        BackgroundGeolocation.start();
    }
    
    const stopTracking = () => {
        // notificate("- Stop tracking success");
        BackgroundGeolocation.stop();
    }

    return (
        <GPSContext.Provider
            value={{startTracking, stopTracking}}
        >
            {props.children}
        </GPSContext.Provider>
    );
} 

export default GPSProvider;
