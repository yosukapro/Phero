/*
| Developed by Redek Project
| Filename : index.js
| Description : Utils class
| Author : DESPLATS Philippe (contact@redekproject.fr)
*/

import EventEmitter from 'utils/EventEmitter';
import { Buffer } from 'buffer';

class PheroUtils {
  /**
  * Get form data from object
  *
  * @param {Object} parentObj - Data
  * @param {FormData} [parentForm] - FormData
  * @param {Object} [parentNamespace] - Object nested
  *
  * @return {FormData} A good form data
  */
  static objectToFormData(parentObj, parentForm, parentNamespace) {
    function changes(obj, form, namespace) {
      const fd = form || new FormData();
      let formKey;

      // eslint-disable-next-line no-unused-vars,no-restricted-syntax
      for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
          formKey = namespace ? `${namespace}[${property}]` : property;

          if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
            changes(obj[property], fd, property);
          } else {
            fd.append(formKey, obj[property]);
          }
        }
      }

      return fd;
    }

    return changes(parentObj, parentForm, parentNamespace);
  }

  /**
   * Transform hexadecimal to Base64
   * @param hex
   * @returns {string}
   */
  static hexToBase64(hex) {
    // eslint-disable-next-line new-cap
    return new Buffer.from(hex, 'hex').toString('base64');
  }

  /**
   * Transform Base64 to hexadecimal
   * @param base64
   * @returns {string}
   */
  static base64ToHex(base64) {
    // eslint-disable-next-line new-cap
    return new Buffer.from(base64, 'base64').toString('hex');
  }

  /**
   * Transform decimal to hexadecimal
   * @param dec
   * @returns {string}
   */
  static decToHex(dec) {
    return (dec.toString(16).toUpperCase());
  }

  static EventEmitter = EventEmitter;
}

export default PheroUtils;
