
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
  localStorage[key] = value;
}

export function updateItem(key, value) {
  localStorage[key] = value;
}

export function clearStorage() {
  localStorage.clear();
}
