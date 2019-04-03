/* eslint-disable no-undef */
import handleError from './handleError';
import { showFailureNotification } from '../reusable/Notifications';
import { getItem } from './localStorage';

const QUESTION_BANK_API = process.env.REACT_APP_QUESTION_BANK_API ? process.env.REACT_APP_QUESTION_BANK_API : `${window.location.origin}/questionbank`;
const PROFILES_API = process.env.REACT_APP_PROFILES_API ? process.env.REACT_APP_PROFILES_API : `${window.location.origin}/profiles`;

// const QUESTION_BANK_API = 'http://af293494236ee11e9989602fe773b974-224893321.us-east-1.elb.amazonaws.com/questionbank';
export default class RequestHandler {

  static isAuthenticated() {
    if (!getItem('token')) {
      return false;
    }
    return true;
  }

  // returns header object
  static getHeader(type, data = {}, isFile = false) {
    const header = {
      method: type,
      headers: {
        Accept: 'application/vnd.questionbank.v1',
        'Content-Type': 'application/json',
      },
    };
    if (!isFile) {
      header.headers['Content-Type'] = 'application/json';
    }
    if (type !== 'get') {
      if (isFile) {
        header.body = data;
      } else {
        header.body = JSON.stringify(data);
      }
    }
    return header;
  }

  static isSuccess(response) {
    if (!(response.ok || response.status === 200 || response.status === 201)) {
      showFailureNotification(handleError(response));
      throw Error(response.statusText);
    }
    return response;
  }

  // HTTP Method get
  static get(action, params = '') {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}${params}`, RequestHandler.getHeader('get'))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method post
  static post(action, data, isFile = false) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('post', data, isFile))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method put
  static put(action, data, isFile = false) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('put', data, isFile))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method delete
  static delete(action) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve,reject) => {
      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('delete', {}))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  static login(action, data) {
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  static verify(action, data) {
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  static fileUploadPost(action, payload) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return RequestHandler.post(action, payload, true);
  }

  static fileUploadPut(action, payload) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return RequestHandler.put(action, payload, true);
  }
}
