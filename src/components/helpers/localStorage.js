import { showFaliureNotification } from '../reusableComponents/Notification/Notification';

/* eslint-disable no-undef */

export function getItem(key) {
  return localStorage[key];
}

export function setItem(key, value) {
  if (localStorage[key]) {
    showFaliureNotification(`Item is already present with  key: ${key}`);
  }
  if (!value) {
    showFaliureNotification('Value should not be empty.');
  }
  localStorage[key] = value;
}

export function updateItem(key, value) {
  if (!localStorage[key] || !key) {
    showFaliureNotification('Key is not passed to getItem or Invalid key.');
  }
  if (!value) {
    showFaliureNotification('Value should not be empty.');
  }
  localStorage[key] = value;
}

export function clearStorage() {
  localStorage.clear();
}
