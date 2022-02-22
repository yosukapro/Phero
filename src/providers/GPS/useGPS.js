/*
| Developed by Redek Project
| Filename : useBLE.js
| Description : Custom hook for consume BLE provider
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import { useContext } from 'react';
import GPSContext from './context';

/**
 * @typedef {Object} GPSContext
 * @property {Function} startTracking - Start tracking gps position
 * @property {Function} stopTracking - Stop tracking gps position
 * @property {Object} lastPosition - Last tracked position
 * @property {Object} getLastPosition - Last tracked position
 */

/**
 * Custom hooks for get BLE Instance
 * @returns {GPSContext}
 */
const useGPS = () => useContext(GPSContext);

export default useGPS;
