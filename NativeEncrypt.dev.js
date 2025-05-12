// NativeEncrypt.js

/*
 * NativeEncrypt.js es un módulo que se utiliza para definir todas las utilidades de cifrado nativas.
 */
import * as helpers from "./@NativeEncrypt/helpers.js";

// Función para obtener el diccionario
export const getDictionary = async function (urlDictionary = "") {
  try {
    if (!urlDictionary) {
      const module = await import("./@NativeEncrypt/dictionary.js");
      return module.dictionary;
    } else {
      const response = await fetch(urlDictionary);
      if (!response.ok) {
        throw new Error(`Error al cargar el diccionario: ${response.statusText}`);
      }
      return await response.text();
    }
  } catch (err) {
    throw new Error(`getDictionary Error: ${err.message}`);
  }
};

// Funciones de Conversión

// Convertir una cadena en base64
export const toBase64 = async function (text = "") {
  if (!text) return text;
  return btoa(text);
};

// Convertir una cadena en base64 en texto plano
export const fromBase64 = async function (text = "") {
  if (!text) return text;
  return atob(text);
};

// Convertir una cadena en formato de URL
export const toUrl = async function (text = "") {
  if (!text) return text;
  return encodeURIComponent(text);
};

// Convertir una cadena en formato de URL en texto plano
export const fromUrl = async function (text = "") {
  if (!text) return text;
  return decodeURIComponent(text);
};

// Convertir una cadena en formato de hexadecimal
export const toHex = async function (text = "") {
  if (!text) return text;
  return helpers.stringToHex(text);
};

// Convertir una cadena en formato de hexadecimal en texto plano
export const fromHex = async function (text = "") {
  if (!text) return text;
  return helpers.hexToString(text);
};

// Convertir una cadena en formato de base64 a hexadecimal
export const base64ToHexConversion = async function (text = "") {
  if (!text) return text;
  return helpers.base64ToHex(text);
};

// Convertir una cadena en formato de hexadecimal a base64
export const hexToBase64Conversion = async function (text = "") {
  if (!text) return text;
  return helpers.hexToBase64(text);
};

// Convertir una cadena en formato de base64 a URL
export const base64ToUrlConversion = async function (text = "") {
  if (!text) return text;
  return helpers.base64ToUrl(text);
};

// Convertir una cadena en formato de URL a base64
export const urlToBase64Conversion = async function (text = "") {
  if (!text) return text;
  return helpers.urlToBase64(text);
};

// Convertir una cadena en formato de hexadecimal a URL
export const hexToUrlConversion = async function (text = "") {
  if (!text) return text;
  return helpers.hexToUrl(text);
};

// Convertir una cadena en formato de URL a hexadecimal
export const urlToHexConversion = async function (text = "") {
  if (!text) return text;
  return helpers.urlToHex(text);
};

// Encriptado Cifra de César
export const caesarEncrypt = async function (text = "", shift = 3) {
  if (!text) return text;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const shiftCode = code + shift;
    const base = code >= 65 && code <= 90 ? 65 : 97;
    return String.fromCharCode(((shiftCode - base) % 26) + base);
  });
};

// Desencriptado Cifra de César
export const caesarDecrypt = async function (text = "", shift = 3) {
  if (!text) return text;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const shiftCode = code - shift;
    const base = code >= 65 && code <= 90 ? 65 : 97;
    return String.fromCharCode(((shiftCode - base + 26) % 26) + base);
  });
};

// Funciones Hash Simples para Ofuscación

// Función hash simple que utiliza el índice y el salt
const hashIndex = (index, salt) => (index + salt) * salt;

// Función hash inversa que deshace el hash
const unhashIndex = (hashedIndex, salt) => hashedIndex / salt - salt;

// Encriptado usando una función hash para ofuscar los índices
export const dictionaryEncrypt = async function ({
  text = "",
  key = "",
  salt = 13,
  publickey = "",
} = {}) {
  try {
    if (!text) return text;
    if (!key) key = await getDictionary();
    let base = 0;
    if (publickey) {
      publickey
        .split("")
        .forEach((char) => {
          const index = key.indexOf(char);
          if (index > -1) {
            base += parseInt(index, 10);
          } else {
            throw new Error(`Carácter no permitido en la clave: ${char}`);
          }
        });
    }
    salt = base ? parseInt(base, 10) * parseInt(salt, 10) : parseInt(salt, 10);
    return text
      .split("")
      .map((char) => {
        const index = key.indexOf(char);
        return index > -1 ? hashIndex(index, salt) : char; // Aplica el hash en el índice
      })
      .join(" ");
  } catch (error) {
    throw new Error(`dictionaryEncrypt Error: ${error.message}`);
  }
};

// Desencriptado aplicando el proceso inverso del hash
export const dictionaryDecrypt = async function ({
  text = "",
  key = "",
  salt = 13,
  publickey = "",
} = {}) {
  if (!text) return text;
  if (!key) key = await getDictionary();
  let base = 0;
  if (publickey) {
    publickey
      .split("")
      .forEach((char) => {
        const index = key.indexOf(char);
        if (index > -1) {
          base += parseInt(index, 10);
        } else {
          throw new Error(`Carácter no permitido en la clave: ${char}`);
        }
      });
  }
  salt = base ? parseInt(base, 10) * parseInt(salt, 10) : parseInt(salt, 10);
  return text
    .split(" ")
    .map((item) => {
      const hashedIndex = parseInt(item, 10);
      const index = unhashIndex(hashedIndex, salt); // Deshace el hash
      return !isNaN(index) && index >= 0 && index < key.length
        ? key[Math.round(index)]
        : item;
    })
    .join("");
};

// Métodos de Encriptación y Desencriptación Usando Crypto API

// Función para generar una clave según el algoritmo
export const generateKey = async (algorithm = "AES-GCM") => {
  switch (algorithm) {
    case "AES-CBC":
    case "AES-GCM":
    case "AES-CTR":
      return await crypto.subtle.generateKey(
        {
          name: algorithm,
          length: 256, // Puedes ajustar a 128 o 192 si es necesario
        },
        true, // Extraíble
        ["encrypt", "decrypt"]
      );

    case "RSA-OAEP":
      return await generateRSAKeyPair();

    default:
      throw new Error(`Algoritmo no soportado: ${algorithm}`);
  }
};

/**
 * Genera una clave AES-GCM de forma determinista a partir de una semilla
 * y un algoritmo hash especificado. La longitud de la clave AES-GCM
 * se define en la importación.
 * @param {string} seed - La semilla utilizada para generar la clave.
 * @param {string} hashAlgorithm - El algoritmo hash a utilizar (ej: 'SHA-1', 'SHA-256', 'SHA-512').
 * @param {number} keyLength - La longitud deseada para la clave AES-GCM en bits (ej: 128, 192, 256).
 * @returns {Promise<CryptoKey>} Una promesa que resuelve a la clave AES-GCM.
 */
export const generateAesGcmKey = async (seed, algorithm = 'SHA-256', keyLength = 256) => {
  try {
    // Codifica la semilla en un array de bytes (Uint8Array).
    const encoder = new TextEncoder();
    const rawSeed = encoder.encode(seed);

    // Aplica el algoritmo hash especificado a la semilla.
    const hashBuffer = await crypto.subtle.digest(algorithm, rawSeed);
    const keyBytes = new Uint8Array(hashBuffer);

    // Calcula la longitud en bytes basada en la longitud en bits deseada.
    const keyLengthBytes = keyLength / 8;

    // Importa los primeros 'keyLengthBytes' del hash como una clave AES-GCM.
    return await crypto.subtle.importKey(
      "raw",
      keyBytes.slice(0, keyLengthBytes),
      "AES-GCM",
      true, // La clave puede ser usada para encriptar y desencriptar.
      ["encrypt", "decrypt"]
    );
  } catch (error) {
    console.error(`Error al generar la clave AES-GCM desde la semilla con ${algorithm} y longitud ${keyLength}:`, error);
    throw new Error(`generateAesGcmKeyFromSeed Error: ${error.message}`);
  }
};
// Función para exportar una clave a ArrayBuffer
/* export const exportKey = async (key) => {
  if (key.algorithm && key.algorithm.name === "RSA-OAEP") {
    // Exportar clave pública y privada por separado
    const publicKey = await crypto.subtle.exportKey("spki", key.publicKey);
    const privateKey = await crypto.subtle.exportKey("pkcs8", key.privateKey);
    return {
      publicKey: Array.from(new Uint8Array(publicKey)),
      privateKey: Array.from(new Uint8Array(privateKey)),
    };
  } else {
    return await crypto.subtle.exportKey("raw", key);
  }
}; */
// Función para exportar una clave a ArrayBuffer
export const exportKey = async (key) => {
  try {
    if (key.publicKey && key.privateKey) { // Verificar si es un par de claves RSA-OAEP         
      const publicKey = await crypto.subtle.exportKey("spki", key.publicKey);
      const privateKey = await crypto.subtle.exportKey("pkcs8", key.privateKey);
      return {
        publicKey: Array.from(new Uint8Array(publicKey)),
        privateKey: Array.from(new Uint8Array(privateKey)),
      };
    } else if (key.algorithm && key.algorithm.name === "RSA-OAEP") { // Si es una clave RSA individual
      const exported = await crypto.subtle.exportKey("spki", key);
      return Array.from(new Uint8Array(exported));
    } else { // Para claves simétricas como AES
      const exported = await crypto.subtle.exportKey("raw", key);
      return Array.from(new Uint8Array(exported));
    }
  } catch (error) {
    throw new Error(`exportKey Error: ${error.message}`);
  }
};

// Función para importar una clave desde ArrayBuffer
export const importKey = async (keyData, algorithm = "AES-GCM", sha = "SHA-256") => {
  switch (algorithm) {
    case "AES-CBC":
    case "AES-GCM":
    case "AES-CTR":
      return await crypto.subtle.importKey(
        "raw",
        new Uint8Array(keyData),
        {
          name: algorithm,
          length: 256, // Asegúrate de que coincide con la longitud original
        },
        true,
        ["encrypt", "decrypt"]
      );

    case "RSA-OAEP":
      if (keyData.publicKey && keyData.privateKey) {
        const publicKey = await crypto.subtle.importKey(
          "spki",
          new Uint8Array(keyData.publicKey),
          {
            name: "RSA-OAEP",
            hash: sha,
          },
          true,
          ["encrypt"]
        );

        const privateKey = await crypto.subtle.importKey(
          "pkcs8",
          new Uint8Array(keyData.privateKey),
          {
            name: "RSA-OAEP",
            hash: sha,
          },
          true,
          ["decrypt"]
        );

        return { publicKey, privateKey };
      } else {
        throw new Error("RSA-OAEP requiere tanto la clave pública como la privada.");
      }

    default:
      throw new Error(`Algoritmo no soportado: ${algorithm}`);
  }
};

// Función para generar un IV según el algoritmo
const generateIV = (algorithm = "AES-GCM") => {
  let ivLength;
  switch (algorithm) {
    case "AES-CBC":
    case "AES-CTR":
      ivLength = 16; // 128 bits
      break;
    case "AES-GCM":
      ivLength = 12; // 96 bits recomendado para GCM
      break;
    default:
      throw new Error(`Algoritmo no soportado para IV: ${algorithm}`);
  }
  return crypto.getRandomValues(new Uint8Array(ivLength));
};

// Función para generar un par de claves RSA-OAEP
const generateRSAKeyPair = async (sha = "SHA-256", length = 2048) => {
  try {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: length, // Puedes usar 2048 o 4096 bits
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
        hash: sha, // SHA-256 es comúnmente usado
      },
      true, // Las claves son extraíbles
      ["encrypt", "decrypt"]
    );

    return keyPair;
  } catch (error) {
    throw new Error(`generateRSAKeyPair Error: ${error.message}`);
  }
};

// Función para cifrar texto con el algoritmo especificado
export const encrypt = async ({text = null, algorithm = "AES-GCM", key = null, options = null} = {}) => {
  try {
    if (!key) {
      key = await generateKey(algorithm);
    }

    let iv;
    let encryptionParams;

    if (algorithm === "RSA-OAEP") {
      encryptionParams = {
        name: algorithm,
      };
    } else {
      iv = generateIV(algorithm);
      if (algorithm === "AES-CTR") {
        encryptionParams = {
          name: algorithm,
          counter: iv,
          length: 128, // Puedes ajustar la longitud del contador si es necesario
        };
      } else {
        // AES-GCM y AES-CBC
        encryptionParams = {
          name: algorithm,
          iv: iv,
        };
      }
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const encrypted = await crypto.subtle.encrypt(
      encryptionParams,
      key.publicKey || key, // Para RSA-OAEP, key será el par de claves
      data
    );

    // Exportar la clave si es extraíble y no es RSA-OAEP
    let exportedKey = null;
    if (algorithm !== "RSA-OAEP") {
      const keyUsable = await crypto.subtle.exportKey("raw", key).catch(() => null);
      if (keyUsable) {
        exportedKey = Array.from(new Uint8Array(keyUsable));
      }
    }

    return {
      key: exportedKey, // Solo si la clave es exportable y no es RSA-OAEP
      iv: iv ? Array.from(iv) : null,
      data: Array.from(new Uint8Array(encrypted)),
      algorithm: algorithm,
    };
  } catch (error) {
    throw new Error(`encrypt Error: ${error.message}`);
  }
};

// Función para descifrar texto con el algoritmo especificado
export const decrypt = async ({encrypted = null, algorithm = "AES-GCM", key = null, options = null } = {}) => {
  try {
    if (!key && encrypted.key) {
      key = await importKey(encrypted.key, algorithm, options.sha);
    } else if (algorithm === "RSA-OAEP" && !key) {
      throw new Error("Clave requerida para descifrar RSA-OAEP.");
    } else if (!key) {
      throw new Error("Clave requerida para descifrar.");
    }

    let decryptionParams;

    if (algorithm === "RSA-OAEP") {
      decryptionParams = {
        name: algorithm,
      };
    } else {
      const iv = new Uint8Array(encrypted.iv);
      if (algorithm === "AES-CTR") {
        decryptionParams = {
          name: algorithm,
          counter: iv,
          length: 128, // Debe coincidir con la longitud utilizada en cifrado
        };
      } else {
        // AES-GCM y AES-CBC
        decryptionParams = {
          name: algorithm,
          iv: iv,
        };
      }
    }

    let decrypted;
    if (algorithm === "RSA-OAEP") {
      decrypted = await crypto.subtle.decrypt(
        decryptionParams,
        key.privateKey, // Para RSA-OAEP, key debe ser el par de claves
        new Uint8Array(encrypted.data)
      );
    } else {
      decrypted = await crypto.subtle.decrypt(
        decryptionParams,
        key,
        new Uint8Array(encrypted.data)
      );
    }

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    throw new Error(`decrypt Error: ${error.message}`);
  }
};
