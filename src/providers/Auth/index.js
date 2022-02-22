/* eslint-disable no-console */
/*
| Developed by Redek Project
| Filename : index.js
| Description : Authentification container to check if the user
| is connected in order to protect the application
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import React, { useState, useEffect } from 'react';
import JWTService from 'services/JWT';
import API from 'services/API';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/actions/user';

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  const JWTCheck = () => new Promise((resolve, reject) => {
    // Auto login event
    JWTService.on('onAutoLogin', () => {
      console.log('onAutoLogin is triggered...'); // ONLY FOR DEBUG
      // TODO: Add snackbar for show "Connection in progress..."

      // Sign in and retrieve user data from API
      JWTService.signInWithToken()
        .then(() => {
          API.get('user/light')
            .then(response => {
              if (response.status === 200) {
                dispatch(setUser(response.data.user));
                resolve();
                // TODO: Add remove connection progress snackbar
                // TODO: Add snackbar for show "Connection successfull"
              } else {
                reject();
                throw new Error(`Récupération des informations impossible. Code:${response.status}`);
              }
            })
            .catch(error => {
              reject(error);
            });
          resolve();
        })
        .catch(() => {
          // TODO: Add remove connection progress snackbar
          console.warn('Jeton d\'accès dépassé, veuillez vous reconnecter.'); // ONLY FOR DEBUG
          reject();
        });
    });

    // Auto logout event
    JWTService.on('onAutoLogout', message => {
      console.log('onAutoLogout is triggered...'); // ONLY FOR DEBUG
      // TODO: if (message)
      // TODO: Show `message` on snackbar
      console.log(message); // ONLY FOR DEBUG
      resolve();
    });

    // No access token event
    JWTService.on('onNoAccessToken', () => {
      console.log('onNoAccessToken is triggered...'); // ONLY FOR DEBUG
      console.warn('No access token stored'); // ONLY FOR DEBUG
      resolve();
    });

    // On logged event
    JWTService.on('onLogged', () => {
      console.log('onLogged is triggered...'); // ONLY FOR DEBUG
      console.log('User logged'); // ONLY FOR DEBUG
    });

    // Init JWT Service
    JWTService.init();

    return Promise.resolve();
  });

  /**
   * Component Did Mount for call JWT Check
   */
  useEffect(() => {
    JWTCheck()
      .then(() => setWaitAuthCheck(false))
      .catch(() => setWaitAuthCheck(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return waitAuthCheck ? null : <>{children}</>;
};

export default Auth;
