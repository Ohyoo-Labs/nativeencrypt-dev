/* 
 * This file is used to store helper functions that are used in the NativeEncrypt module.
 */

// Funciones Auxiliares para Conversiones

// Convertir una cadena a hexadecimal
const stringToHex = (str) => {
  return Array.from(str)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

// Convertir hexadecimal a cadena
const hexToString = (hex) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

// Convertir base64 a hexadecimal
const base64ToHex = (base64) => {
  const binary = atob(base64);
  return stringToHex(binary);
};

// Convertir hexadecimal a base64
const hexToBase64 = (hex) => {
  const binary = hexToString(hex);
  return btoa(binary);
};

// Convertir base64 a URL
const base64ToUrl = (base64) => {
  const binary = atob(base64);
  return encodeURIComponent(binary);
};

// Convertir URL a base64
const urlToBase64 = (url) => {
  const decoded = decodeURIComponent(url);
  return btoa(decoded);
};

// Convertir hexadecimal a URL
const hexToUrl = (hex) => {
  const decoded = hexToString(hex);
  return encodeURIComponent(decoded);
};

// Convertir URL a hexadecimal
const urlToHex = (url) => {
  const decoded = decodeURIComponent(url);
  return stringToHex(decoded);
};

export {
  stringToHex,
  hexToString,
  base64ToHex,
  hexToBase64,
  base64ToUrl,
  urlToBase64,
  hexToUrl,
  urlToHex,
};