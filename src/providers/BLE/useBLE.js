/*
| Developed by Redek Project
| Filename : useBLE.js
| Description : Custom hook for consume BLE provider
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import { useContext } from 'react';
import BLEContext from './context';

/**
 * @typedef {Object} BLEContext
 * @property {BleManager} BLEManagerInstance - Get BLE Manager Instance
 * @property {Function} postAlert - Post new alert
 * @property {Function} scanAndConnect - Connect to device
 * @property {Function} sendData - Write to BLEinstance
 * @property {Function} disconnectDevice - Disconnect device
 * @property {Device} deviceConnected - Device connected object
 * @property {Service} service - Array of device services
 * @property {Characteristic} write - Array of write service characteristics
 * @property {Characteristic} read - Array of read service characteristics
 */

/**
 * Custom hooks for get BLE Instance
 * @returns {BLEContext}
 */
const useBLE = () => useContext(BLEContext);

export default useBLE;
