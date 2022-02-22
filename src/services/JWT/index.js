/* eslint-disable no-console */
/*
| Developed by Redek Project
| Filename : index.js
| Description : Service to manage the JWT in our application
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import JWTDecode from 'jwt-decode';
import API from 'services/API';
import AsyncStorage from '@react-native-community/async-storage';
import PheroUtils from 'utils';

// TODO: Ajouter les redirection via AppNavigator

class JWTService extends PheroUtils.EventEmitter {
  /**
   * Initialization
   */
  init = async () => {
    this.setInterceptors();
    await this.handleAuthentification();

    console.log('JWT initialized...');
  }

  /**
   * Methods for set interceptors
   */
  setInterceptors = () => {
    API.interceptors.response.use(
      response => response,
      err => {
        if (
          err.response.status === 401
          && err.config
          // eslint-disable-next-line no-underscore-dangle
          && !err.config.__isRetryRequest
        ) {
          // If you ever get an unauthorized response, logout the user
          this.emit('onAutoLogout');
          this.setSession(null);
        }

        return Promise.reject(err);
      },
    );
  }

  /**
   * Check authentification method
   * @returns {Promise<void>}
   */
  handleAuthentification = async () => {
    const token = await this.getToken();
    const refreshToken = await this.getRefreshToken();

    // If no token is finded, emit `onNoAccessToken` event
    if (!token) {
      this.emit('onNoAccessToken');
      return;
    }

    // Check if current token is valid
    if (this.isValidAuthToken(token)) {
      console.log('Token is valid', token);

      await this.setSession(token, refreshToken);
      this.emit('onAutoLogin', true);
    } else {
      console.log('Token is not valid');

      this.signInWithRefreshToken();
      // await this.setSession(null);
      // this.emit('onAutoLogout', 'Accès expiré, veuillez vous reconnecter.');
    }
  }

  /**
   * Sign in with credentials (username and password)
   * @param username
   * @param password
   * @returns {Promise<null>}
   */
  signInWithCredentials = async (username, password) => (
    new Promise((resolve, reject) => {
      console.log('Sign in with credentials');

      API.post(
        'auth/login',
        { username, password },
      )
        .then(async response => {
          console.info('Sign in with credentials', response);

          // Set session and emit onLogged event
          // eslint-disable-next-line camelcase
          const { token, refresh_token } = response.data;
          await this.setSession(token, refresh_token);
          this.emit('onLogged');

          // Get user informations
          this.getUserInformations()
            .then(userInformationsResponse => resolve(userInformationsResponse))
            .catch(userInformationsError => reject(userInformationsError));
        })
        .catch(error => {
          console.error(error);

          // Logout current logged user
          this.logout();
          reject(error.response.data);
        });
    })
  )

  /**
   * Sign in with refresh token
   * @returns {Promise<R>}
   */
  signInWithRefreshToken = async () => (
    new Promise((resolve, reject) => {
      this.getRefreshToken()
        .then(refreshToken => {
          API.post('/token/refresh', { refresh_token: refreshToken })
            .then(async response => {
              // eslint-disable-next-line camelcase
              const { token, refresh_token } = response.data;
              await this.setSession(token, refresh_token);
              this.emit('onLogged');

              // Get user informations
              this.getUserInformations()
                .then(userInformationsResponse => resolve(userInformationsResponse))
                .catch(userInformationsError => reject(userInformationsError));
            })
            .catch(error => {
              this.logout();
              this.emit('onAutoLogout', 'Accès expiré, veuillez vous reconnecter.');
              reject(error);
            });
        })
        .catch(console.error);
    })
  )

  /**
   * Sign in with token
   * @returns {Promise<R>}
   */
  signInWithToken = async () => (
    new Promise((resolve, reject) => {
      this.getToken()
        .then(token => {
          this.emit('onLogged');
          API.defaults.headers.common.Authorization = `Bearer ${token}`;
          resolve();
        })
        .catch(() => {
          this.logout();
          reject();
        });
    })
  )

  /**
   * Logout method
   * @returns {Promise<void>}
   */
  logout = async () => {
    // API.delete('auth/disconnect');
    await this.setSession(null);
  }

  /**
   * Method for get user informations
   * @returns {Promise}
   */
  getUserInformations = async () => API.get('user/light')

  /**
   * Set new session or clear current session
   * @param token
   * @param refreshToken
   * @returns {Promise<void>}
   */
  setSession = async (token, refreshToken) => {
    if (token) {
      // Storage token and refresh token
      try {
        await AsyncStorage.setItem('jwt_token', token);
        await AsyncStorage.setItem('jwt_refresh_token', refreshToken);

        // Define default Authorization header
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // Delete token and refresk token in storage
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('jwt_refresh_token');

        // Delete default Authorization header
        delete API.defaults.headers.common.Authorization;
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Check if current token is valid
   * @param token
   * @returns {boolean}
   */
  isValidAuthToken = token => {
    if (!token) return false;

    const decoded = JWTDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      console.warn('Token expiré.');
      return false;
    }

    return true;
  }

  /**
   * Return current stored token
   * @returns {Promise<null|string>}
   */
  getToken = () => {
    try {
      return AsyncStorage.getItem('jwt_token');
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Get current stored refresh token
   * @returns {Promise<null|string>}
   */
  getRefreshToken = async () => {
    try {
      return AsyncStorage.getItem('jwt_refresh_token');
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const instance = new JWTService();
export default instance;
