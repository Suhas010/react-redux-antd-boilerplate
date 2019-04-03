import { showFailureNotification } from '../reusable/Notifications';

/* eslint-disable no-undef */

export function getItem(key) {
  return localStorage[key];
}

export function isExist(key) {
  if (localStorage[key]) {
    return true;
  }
  return false;
}

export function setItem(key, value) {
  if (localStorage[key]) {
    // showFailureNotification(`Item is already present with  key: ${key}`);
  }
  if (!value) {
    // showFailureNotification('Value should not be empty.');
  }
  localStorage[key] = value;
}

export function updateItem(key, value) {
  if (!localStorage[key] || !key) {
    // showFailureNotification('Key is not passed to getItem or Invalid key.');
  }
  if (!value) {
    // showFailureNotification('Value should not be empty.');
  }
  localStorage[key] = value;
}

export function clearStorage() {
  localStorage.clear();
}
