import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Logs = ({ navigation }) => {
  const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('gpsdata')
        if(value !== null) {
            setLogs(value);
        } else {
            return '';
        }
    } catch(e) {
        console.error(JSON.stringify(e))
    }
  }

  const resetLog = async () => {
    try {
        await AsyncStorage.setItem('gpsdata', '')
    } catch (e) {
        console.error(JSON.stringify(e))
    }
  }

  const [logs, setLogs] = useState('');

  useEffect(() => {
    getData();
  }, [logs])

  return (
    <>
      <ScrollView>
        {logs.split('|').map((e, i) => (
          <Text style={{backgroundColor: i%2 ? '#EEE' : '#FFF'}}>{e}</Text>
        ))}
      </ScrollView>
      <TouchableOpacity style={{height: 30, justifyContent:'center', textAlign: 'center', alignItems: 'center', backgroundColor: 'grey' }} onPress={ async () => resetLog()}>
        <Text>RESET LOGS</Text>
      </TouchableOpacity>
    </>
  );
};

export default Logs;
