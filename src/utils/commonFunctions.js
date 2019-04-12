/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
import { getItem, isExist } from '../components/helpers/localStorage';

export function isValidEmail(email = '') {
  if (!email) return false;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
export function isValidContactNumber(contactNumber = '') {
  if (!contactNumber) return false;
  if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactNumber)) {
    return true;
  }
  return false;
}

export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

// checks if item is in given array or not
export function contains(arr, item) {
  return arr.indexOf(item) > -1;
}

// genarate and returns unique UUID
export function getUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function getIDOf(key, name) {
  return JSON.parse(getItem(key)).find(item => item.name === name).value;
}

export function getConfigFor(key) {
  if (isExist(key)) {
    return JSON.parse(getItem(key));
  }
  return [];
}

export function getMobileNumber(number, dialCode) {
  let mobileNumber = number.replace(`+${dialCode}`, '').trim();
  mobileNumber = mobileNumber.replace(' ', '');
  mobileNumber = mobileNumber.replace('-', '');
  mobileNumber = mobileNumber.replace('(', '');
  mobileNumber = mobileNumber.replace(')', '');
  return mobileNumber;
}

export function sort(array, key) {
  array.sort((first, second) => {
    if (first[key] < second[key]) return -1;
    if (first[key] > second[key]) return 1;
    return 0;
  });
  return array;
}
