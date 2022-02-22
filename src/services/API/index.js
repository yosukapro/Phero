/*
| Developed by Redek Project
| Filename : index.js
| Description : Instance of Axios
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import axios from 'axios';
import config from 'config';

export default axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
