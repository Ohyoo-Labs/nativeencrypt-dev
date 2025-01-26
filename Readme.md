# NativeEncrypt.js

**NativeEncrypt.js** es un módulo de JavaScript diseñado para simplificar y potenciar ciertas funcionalidades de encriptación, desencriptación, conversión de datos y ofuscación. Aprovechando las capacidades nativas de la Web Crypto API, **NativeEncrypt.js** ofrece un conjunto de herramientas que combinan seguridad y facilidad de uso, permitiendo a los desarrolladores integrar ciertas funcionalidades criptográficas en sus aplicaciones de manera eficiente. Su objetivo es proporcionar una solución muy ligera y bastante versátil para tareas comunes de encriptación y ofuscación de datos, sin depender de bibliotecas externas o servicios de terceros y con un peso mucho menor al de otras bibliotecas de encriptación.

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Importación del Módulo](#importación-del-módulo)
  - [Funciones de Conversión](#funciones-de-conversión)
  - [Funciones de Ofuscación](#funciones-de-ofuscación)
  - [Funciones de Encriptación y Desencriptación](#funciones-de-encriptación-y-desencriptación)
    - [Encriptación Simétrica](#encriptación-simétrica)
    - [Encriptación Asimétrica (RSA-OAEP)](#encriptación-asimétrica-rsa-oaep)
- [Referencia de la API](#referencia-de-la-api)
  - [Funciones de Conversión](#funciones-de-conversión-1)
    - [`toBase64(text)`](#tobas64text)
    - [`fromBase64(text)`](#frombas64text)
    - [`toUrl(text)`](#tourltext)
    - [`fromUrl(text)`](#fromurltext)
    - [`toHex(text)`](#tohextext)
    - [`fromHex(text)`](#fromhextext)
    - [`base64ToHexConversion(text)`](#base64tohexconversiontext)
    - [`hexToBase64Conversion(text)`](#hextobase64conversiontext)
    - [`base64ToUrlConversion(text)`](#base64tourlconversiontext)
    - [`urlToBase64Conversion(text)`](#urltobase64conversiontext)
    - [`hexToUrlConversion(text)`](#hextourlconversiontext)
    - [`urlToHexConversion(text)`](#urltohexconversiontext)
  - [Funciones de Ofuscación](#funciones-de-ofuscación)
    - [`caesarEncrypt(text, shift)`](#caesarencrypttext-shift)
    - [`caesarDecrypt(text, shift)`](#caesardecrypttext-shift)
    - [`dictionaryEncrypt({ text, key, salt, publickey })`](#dictionaryencrypt-text-key-salt-publickey-)
    - [`dictionaryDecrypt({ text, key, salt, publickey })`](#dictionarydecrypt-text-key-salt-publickey-)
  - [Funciones de Encriptación y Desencriptación](#funciones-de-encriptación-y-desencriptación-1)
    - [`generateKey(algorithm, options)`](#generatekeyalgorithm-options)
    - [`exportKey(key)`](#exportkeykey)
    - [`importKey(keyData, algorithm, sha)`](#importkeykeydata-algorithm-sha)
    - [`encrypt(text, algorithm, key, options)`](#encrypttext-algorithm-key-options)
    - [`decrypt(encrypted, algorithm, key, options)`](#decryptencrypted-algorithm-key-options)
- [Pruebas](#pruebas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Características

- **Conversión de Datos:** Facilita la conversión entre Base64, codificación URL, Hexadecimal y texto plano.
- **Ofuscación:** Implementa técnicas sencillas como la Cifra de César y encriptación basada en diccionario para ocultar datos.
- **Encriptación Simétrica:** Soporte para algoritmos AES incluyendo AES-GCM, AES-CBC y AES-CTR.
- **Encriptación Asimétrica:** Encriptación y desencriptación segura de datos utilizando RSA-OAEP.
- **Gestión de Claves:** Genera, exporta e importa claves criptográficas de manera eficiente.
- **Configuración Dinámica:** Permite personalizar algoritmos de hashing y longitudes de clave para adaptarse a diferentes necesidades de seguridad.
- **Facilidad de Uso:** Proporciona envoltorios simplificados para las funcionalidades nativas de JavaScript, facilitando su integración en proyectos existentes.

## Instalación

Puedes incluir **NativeEncrypt.js** en tu proyecto descargando los archivos directamente o usando un gestor de paquetes.

### Usando npm

```bash
npm install nativeencrypt
```

### Usando GitHub:

```bash
git clone https://github.com/Ohyoo-Labs/nativeencrypt.git
```
## Estructura de Archivos
Asegúrate de tener los siguientes archivos en tu directorio de proyecto:

```bash
Copiar
/nativeencrypt/
├── src   # Versión de desarrollo
    ├── NativeEncrypt.js       # Versión minificada
    ├── helpers.js
    └── dictionary.js
├── native-encrypt.js   # Archivo principal
├── LICENSE            # Licencia
├── package.json
└── README.md          # Documentación
```
## Uso
  - Importación del Módulo
Importa NativeEncrypt.js como un módulo ES6 en tu archivo JavaScript:

```javascript
import NativeEncrypt from './native-encrypt.js';
```
### Funciones de Conversión
**NativeEncrypt.js** proporciona funciones para convertir datos entre diferentes formatos de codificación.

### Convertir Texto a Base64

```javascript
const base64 = await NativeEncrypt.toBase64('Hola Mundo');
console.log(base64); // Muestra: 'SG9sYSBNdW5kbw=='
```
**Caso de Uso:** Almacenar o transmitir datos en formatos que requieren codificación Base64.

**Fortalezas:**

- Fácil de implementar.
- Compatible con múltiples plataformas.

**Debilidades:**
- No proporciona seguridad; solo codifica los datos.

**Velocidad:**
- Comparable a otras funciones de codificación nativas de JavaScript.

### Convertir Base64 a Texto

```javascript
const texto = await NativeEncrypt.fromBase64('SG9sYSBNdW5kbw==');
console.log(texto); // Muestra: 'Hola Mundo'
```
**Caso de Uso:** Decodificar datos recibidos en formato Base64 para su uso en aplicaciones.

**Fortalezas:**
- Recupera datos originales fácilmente.

**Debilidades:**
- No verifica la integridad de los datos.

**Velocidad:** 
- Muy rápido, similar a otras funciones de decodificación nativas.

### Convertir Texto a URL

```javascript
const url = await NativeEncrypt.toUrl('Hola Mundo');
console.log(url); // Muestra: 'Hola%20Mundo'
```
**Caso de Uso:** Formatear texto para su uso en URLs.

**Fortalezas:**
- Evita errores de codificación en URLs.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Convertir URL a Texto

```javascript
const texto = await NativeEncrypt.fromUrl('Hola%20Mundo');
console.log(texto); // Muestra: 'Hola Mundo'
```

**Caso de Uso:** Decodificar texto codificado para su uso en aplicaciones web.

**Fortalezas:**
- Recupera datos originales fácilmente.

**Debilidades:**
- No verifica la integridad de los datos.

**Velocidad:**
- Muy rápido, similar a otras funciones de decodificación nativas.

### Convertir Texto a Hexadecimal

```javascript
const hex = await NativeEncrypt.toHex('Hola Mundo');
console.log(hex); // Muestra: '486f6c61204d756e646f'
```

**Caso de Uso:** Representar datos en formato hexadecimal para su uso en aplicaciones criptográficas.

**Fortalezas:**
- Proporciona una representación visual de los datos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Convertir Hexadecimal a Texto

```javascript
const texto = await NativeEncrypt.fromHex('486f6c61204d756e646f');
console.log(texto); // Muestra: 'Hola Mundo'
```

**Caso de Uso:** Decodificar datos hexadecimales para su uso en aplicaciones web.

**Fortalezas:**
- Recupera datos originales fácilmente.

**Debilidades:**
- No verifica la integridad de los datos.

**Velocidad:**
- Muy rápido, similar a otras funciones de decodificación nativas.

### Conversión entre Base64 y Hexadecimal

```javascript
const base64 = await NativeEncrypt.base64ToHexConversion('SG9sYSBNdW5kbw==');
console.log(base64); // Muestra: '486f6c61204d756e646f'
```

**Caso de Uso:** Convertir datos entre formatos Base64 y hexadecimal.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Conversión entre Hexadecimal y Base64

```javascript
const base64 = await NativeEncrypt.hexToBase64Conversion('486f6c61204d756e646f');
console.log(base64); // Muestra: 'SG9sYSBNdW5kbw=='
```

**Caso de Uso:** Convertir datos entre formatos hexadecimal y Base64.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Conversión entre Base64 y URL

```javascript
const base64 = await NativeEncrypt.base64ToUrlConversion('SG9sYSBNdW5kbw==');
console.log(base64); // Muestra: 'Hola%20Mundo'
```

**Caso de Uso:** Convertir datos entre formatos Base64 y URL.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Conversión entre URL y Base64

```javascript
const base64 = await NativeEncrypt.urlToBase64Conversion('Hola%20Mundo');
console.log(base64); // Muestra: 'SG9sYSBNdW5kbw=='
```

**Caso de Uso:** Convertir datos entre formatos URL y Base64.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Conversión entre Hexadecimal y URL

```javascript
const base64 = await NativeEncrypt.hexToUrlConversion('486f6c61204d756e646f');
console.log(base64); // Muestra: 'Hola%20Mundo'
```

**Caso de Uso:** Convertir datos entre formatos hexadecimal y URL.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.

### Conversión entre URL y Hexadecimal

```javascript
const base64 = await NativeEncrypt.urlToHexConversion('Hola%20Mundo');
console.log(base64); // Muestra: '486f6c61204d756e646f'
```

**Caso de Uso:** Convertir datos entre formatos URL y hexadecimal.

**Fortalezas:**
- Proporciona flexibilidad para trabajar con diferentes formatos.

**Debilidades:**
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, similar a otras funciones de codificación nativas.


## Funciones de Ofuscación

**NativeEncrypt.js** incluye funciones para ofuscar datos utilizando técnicas simples pero efectivas y de bajo costo computacional.

### Cifra de César

La Cifra de César es una técnica de cifrado que desplaza cada letra de un texto por un número fijo de posiciones en el alfabeto.

### Encriptar con Cifra de César

```javascript
const textoCifrado = NativeEncrypt.caesarEncrypt('Hola Mundo', 3);
console.log(textoCifrado); // Muestra: 'Krod Pxqgr'
```

**Caso de Uso:** Ocultar datos sensibles mediante un cifrado simple.

**Fortalezas:**
- Fácil de implementar.
- Bajo costo computacional.

**Debilidades:**
- Vulnerable a ataques de fuerza bruta.
- No proporciona seguridad adicional.

**Velocidad:**
- Rápido, incluso para textos largos.

### Desencriptar con Cifra de César

```javascript
const textoOriginal = NativeEncrypt.caesarDecrypt('Krod Pxqgr', 3);
console.log(textoOriginal); // Muestra: 'Hola Mundo'
```

**Caso de Uso:** Recuperar datos cifrados con la Cifra de César.

**Fortalezas:**
- Recupera datos originales fácilmente.
- Bajo costo computacional.

**Debilidades:**
- Vulnerable a ataques de fuerza bruta.
- No verifica la integridad de los datos.

**Velocidad:**
- Rápido, incluso para textos largos.

### Encriptación Basada en Diccionario

La encriptación basada en diccionario reemplaza palabras en un texto con sinónimos o palabras aleatorias de un diccionario.

### Importar Diccionario

```javascript
 const dictionary = NativeEncrypt.getDictionary(url); // url es la ruta local o remota del diccionario a utilizar, si no se especifica se utiliza el diccionario por defecto que se encuentra en el archivo dictionary.js.
```

### Encriptar con Diccionario

```javascript
const textoCifrado = NativeEncrypt.dictionaryEncrypt({
  text: 'Hola Mundo',
  key: dictionary["opcional"], // El diccionario a utilizar, si no se especifica se utiliza el diccionario por defecto que se encuentra en el archivo dictionary.js.
  salt: number,
  publickey: 'publica'
});
console.log(textoCifrado); // Ejemplo: '367234556 123456'
```

**Caso de Uso:** Ocultar datos sensibles mediante un cifrado basado en diccionario.

**Fortalezas:**
- Dificulta la lectura de datos cifrados.
- Bajo costo computacional.

**Debilidades:**
- No proporciona seguridad adicional.
- Vulnerable a ataques de diccionario.

**Velocidad:**
- Rápido, incluso para textos largos.

### Desencriptar con Diccionario

```javascript
const textoOriginal = NativeEncrypt.dictionaryDecrypt({
  text: '367234556 123456',
  key: dictionary["opcional"], // El diccionario a utilizar, si no se especifica se utiliza el diccionario por defecto que se encuentra en el archivo dictionary.js. Este debe ser el mismo que en la encriptación.
  salt: number, // Número de iteraciones debe ser el mismo que en la encriptación
  publickey: 'publica'
});
console.log(textoOriginal); // Muestra: 'Hola Mundo'
```

**Caso de Uso:** Recuperar datos cifrados con encriptación basada en diccionario.

**Fortalezas:**
- Recupera datos originales fácilmente.
- Bajo costo computacional.

**Debilidades:**
- No verifica la integridad de los datos.
- Vulnerable a ataques de diccionario.

**Velocidad:**
- Rápido, incluso para textos largos.

## Funciones de Encriptación y Desencriptación

**NativeEncrypt.js** ofrece funciones para encriptar y desencriptar datos utilizando algoritmos simétricos y asimétricos.

### Encriptación Simétrica

La encriptación simétrica utiliza la misma clave para encriptar y desencriptar datos.

### Generar Clave

```javascript
let key = await NativeEncrypt.generateKey('AES-GCM', { length: 256 });
console.log(key); // Muestra: CryptoKey { type: 'secret', algorithm: { name: 'AES-GCM', length: 256 } }
```

**Caso de Uso:** Generar claves criptográficas para encriptación simétrica.

**Fortalezas:**
- Permite personalizar algoritmos y longitudes de clave.

**Debilidades:**
- Requiere almacenar y proteger las claves de forma segura.

**Velocidad:**
- Rápido, incluso para claves largas.

### Exportar Clave

```javascript
let exportedKey = await NativeEncrypt.exportKey(key);
console.log(exportedKey); // Muestra: 'U2FsdGVkX1+3"
```

**Caso de Uso:** Exportar claves criptográficas para almacenamiento o transmisión segura.

**Fortalezas:**
- Permite compartir claves de forma segura.

**Debilidades:**
- Requiere proteger las claves exportadas.

**Velocidad:**
- Rápido, incluso para claves largas.

### Importar Clave

```javascript
let importedKey = await NativeEncrypt.importKey(exportedKey, 'AES-GCM', 'SHA-256');
console.log(importedKey); // Muestra: CryptoKey { type: 'secret', algorithm: { name: 'AES-GCM', length: 256 } }
```

**Caso de Uso:** Importar claves criptográficas para su uso en encriptación simétrica.

**Fortalezas:**
- Permite reutilizar claves exportadas.

**Debilidades:**
- Requiere proteger las claves importadas.

**Velocidad:**
- Rápido, incluso para claves largas.

### Encriptar Datos

```javascript
let encrypted = await NativeEncrypt.encrypt('Hola Mundo', 'AES-GCM', key, options);
console.log(encrypted); // Muestra: 'U2FsdGVkX1+3"
// algorithm es el algoritmo de encriptación a utilizar (AES-GCM, AES-CBC, AES-CTR, etc.)
// options es un objeto que puede contener parámetros adicionales como iv, tag, etc. Es opcional y puede ser omitido.
```

**Caso de Uso:** Encriptar datos sensibles utilizando una clave simétrica.

**Fortalezas:**
- Proporciona seguridad adicional a los datos.
- Permite personalizar algoritmos y opciones de encriptación.

**Debilidades:**
- Requiere proteger las claves y datos encriptados.

**Velocidad:**
- Rápido, incluso para datos grandes.

### Desencriptar Datos

```javascript
let decrypted = await NativeEncrypt.decrypt(encrypted, 'AES-GCM', key, options);
console.log(decrypted); // Muestra: 'Hola Mundo'
// algorithm es el algoritmo de encriptación a utilizar (AES-GCM, AES-CBC, AES-CTR, etc.)
// options es un objeto que puede contener parámetros adicionales como iv, tag, etc. Es opcional y puede ser omitido.
```

**Caso de Uso:** Desencriptar datos encriptados con una clave simétrica.

**Fortalezas:**
- Recupera datos originales de forma segura.
- Permite personalizar algoritmos y opciones de encriptación.

**Debilidades:**
- Requiere proteger las claves y datos encriptados.

**Velocidad:**
- Rápido, incluso para datos grandes.

### Encriptación Asimétrica (RSA-OAEP)

La encriptación asimétrica utiliza un par de claves (pública y privada) para encriptar y desencriptar datos.

### Generar Par de Claves

```javascript
let keyPair = await NativeEncrypt.generateKey('RSA-OAEP');
console.log(keyPair); // Muestra: { publicKey: CryptoKey, privateKey: CryptoKey }
// Existe la posibilidad de generar claves de diferentes longitudes, por defecto se genera una clave de 2048 bits. Para esto se puede invocar directamente el metodo generateRSAKeyPair que puede recibir el algoritmo de encriptación y la longitud de la clave.
let keyPair = await NativeEncrypt.generateRSAKeyPair("sha-256", 4096);
```

**Caso de Uso:** Generar un par de claves para encriptación asimétrica.

**Fortalezas:**
- Proporciona seguridad adicional a los datos.
- Permite personalizar algoritmos y longitudes de clave.

**Debilidades:**
- Requiere proteger las claves de forma segura.

**Velocidad:**
- Rápido, incluso para claves largas.

### Exportar Claves

```javascript
let exportedKeys = await NativeEncrypt.exportKey(keyPair);
console.log(exportedKeys); // Muestra el par de claves exportadas.
```

**Caso de Uso:** Exportar la clave pública para compartir de forma segura.

**Fortalezas:**
- Permite compartir la clave pública de forma segura.

**Debilidades:**
- Requiere proteger la clave exportada.

**Velocidad:**
- Rápido, incluso para claves largas.



### Importar Claves

```javascript
let importedKeys = await NativeEncrypt.importKey(exportedKeys, 'RSA-OAEP');
console.log(importedKeys); // Muestra: CryptoKey { type: 'public', algorithm: { name: 'RSA-OAEP', hash: { name: 'SHA-256' } } }
```

**Caso de Uso:** Importar las claves para encriptación asimétrica.

**Fortalezas:**
- Permite reutilizar claves exportadas.

**Debilidades:**
- Requiere proteger las claves importadas.

**Velocidad:**
- Rápido, incluso para claves largas.

### Encriptar Datos

```javascript
let encrypted = await NativeEncrypt.encrypt('Hola Mundo', 'RSA-OAEP', importedKeys);
console.log(encrypted); // Muestra: 'U2FsdGVkX1+3"
```

**Caso de Uso:** Encriptar datos sensibles utilizando una clave pública.

**Fortalezas:**
- Proporciona seguridad adicional a los datos.

**Debilidades:**
- Requiere proteger las claves y datos encriptados.

**Velocidad:**
- Rápido, incluso para datos grandes.

### Desencriptar Datos

```javascript
let decrypted = await NativeEncrypt.decrypt(encrypted, 'RSA-OAEP', importedKeys);
console.log(decrypted); // Muestra: 'Hola Mundo'
```

**Caso de Uso:** Desencriptar datos encriptados con una clave privada.

**Fortalezas:**
- Recupera datos originales de forma segura.

**Debilidades:**
- Requiere proteger las claves y datos encriptados.

**Velocidad:**
- Rápido, incluso para datos grandes.

## Referencia de la API

### Funciones de Conversión

#### `toBase64(text)`
Convierte un texto en formato Base64.

- `text` (string): Texto a convertir.

**Retorna:** Promesa que resuelve en el texto convertido a Base64.

#### `fromBase64(text)`
Convierte un texto en formato Base64 a texto plano.

- `text` (string): Texto en formato Base64.

**Retorna:** Promesa que resuelve en el texto decodificado.

#### `toUrl(text)`

Convierte un texto en formato URL.

- `text` (string): Texto a convertir.

**Retorna:** Promesa que resuelve en el texto convertido a formato URL.

#### `fromUrl(text)`
Convierte un texto en formato URL a texto plano.

- `text` (string): Texto en formato URL.

**Retorna:** Promesa que resuelve en el texto decodificado.

#### `toHex(text)`

Convierte un texto en formato hexadecimal.

- `text` (string): Texto a convertir.

**Retorna:** Promesa que resuelve en el texto convertido a formato hexadecimal.

#### `fromHex(text)`

Convierte un texto en formato hexadecimal a texto plano.

- `text` (string): Texto en formato hexadecimal.

**Retorna:** Promesa que resuelve en el texto decodificado.

#### `base64ToHexConversion(text)`

Convierte un texto en formato Base64 a formato hexadecimal.

- `text` (string): Texto en formato Base64.

**Retorna:** Promesa que resuelve en el texto convertido a formato hexadecimal.

#### `hexToBase64Conversion(text)`
Convierte un texto en formato hexadecimal a formato Base64.

- `text` (string): Texto en formato hexadecimal.

**Retorna:** Promesa que resuelve en el texto convertido a formato Base64.

#### `base64ToUrlConversion(text)`

Convierte un texto en formato Base64 a formato URL.

- `text` (string): Texto en formato Base64.

**Retorna:** Promesa que resuelve en el texto convertido a formato URL.

#### `urlToBase64Conversion(text)`

Convierte un texto en formato URL a formato Base64.

- `text` (string): Texto en formato URL.

**Retorna:** Promesa que resuelve en el texto convertido a formato Base64.

#### `hexToUrlConversion(text)`

Convierte un texto en formato hexadecimal a formato URL.

- `text` (string): Texto en formato hexadecimal.

**Retorna:** Promesa que resuelve en el texto convertido a formato URL.

#### `urlToHexConversion(text)`

Convierte un texto en formato URL a formato hexadecimal.

- `text` (string): Texto en formato URL.

**Retorna:** Promesa que resuelve en el texto convertido a formato hexadecimal.

### Funciones de Ofuscación

#### `caesarEncrypt(text, shift)`
Encripta un texto utilizando la Cifra de César.

- `text` (string): Texto a encriptar.
- `shift` (number): Número de posiciones a desplazar en el alfabeto.

**Retorna:** Texto encriptado.

#### `caesarDecrypt(text, shift)`

Desencripta un texto encriptado con la Cifra de César.

- `text` (string): Texto encriptado.
- `shift` (number): Número de posiciones desplazadas en el alfabeto.

**Retorna:** Texto desencriptado.

#### `generateDictionary(url)`
Obtiene un diccionario de palabras desde una URL. Si no se especifica una URL, se utiliza el diccionario por defecto.

- `url` (string): URL del diccionario de caracteres.

**Retorna:** Diccionario de caracteres.

#### `dictionaryEncrypt({ text, key, salt, publickey })`

Encripta un texto utilizando un diccionario de palabras.

- `text` (string): Texto a encriptar.
- `key` (string): Diccionario de caracteres [opcional].
- `salt` (number): Valor de sal para encriptación.
- `publickey` (string): Clave pública para encriptación.

**Retorna:** Texto encriptado.

#### `dictionaryDecrypt({ text, key, salt, publickey })`

Desencripta un texto encriptado con un diccionario de palabras.

- `text` (string): Texto encriptado.
- `key` (string): Diccionario de caracteres [opcional]. Debe ser el mismo que en la encriptación.
- `salt` (number): Valor de sal para encriptación.
- `publickey` (string): Clave pública para encriptación.

**Retorna:** Texto desencriptado.

### Funciones de Encriptación y Desencriptación

#### `generateKey(algorithm, options)`
Genera una clave criptográfica para encriptación simétrica.

- `algorithm` (string): Algoritmo de encriptación a utilizar.
- `options` (object): Opciones adicionales para la generación de la clave.

**Retorna:** Promesa que resuelve en la clave generada.

#### `exportKey(key)`
Exporta una clave criptográfica para
almacenamiento o transmisión segura.

- `key` (CryptoKey): Clave a exportar.

**Retorna:** Promesa que resuelve en la clave exportada.

#### `importKey(keyData, algorithm, sha)`

Importa una clave criptográfica para su uso en encriptación simétrica.

- `keyData` (keyPair): Clave a importar.
- `algorithm` (string): Algoritmo de encriptación a utilizar.

**Retorna:** Promesa que resuelve en la clave importada.

#### `encrypt(text, algorithm, key, options)`
Encripta un texto utilizando una clave simétrica.

- `text` (string): Texto a encriptar.
- `algorithm` (string): Algoritmo de encriptación a utilizar.
- `key` (CryptoKey): Clave de encriptación.
- `options` (object[opcional]): Opciones adicionales para la encriptación.

**Retorna:** Promesa que resuelve en el texto encriptado.

#### `decrypt(encrypted, algorithm, key, options)`

Desencripta un texto encriptado con una clave simétrica.

- `encrypted` (string): Texto encriptado.
- `algorithm` (string): Algoritmo de encriptación a utilizar.
- `key` (CryptoKey): Clave de encriptación.
- `options` (object[opcional]): Opciones adicionales para la desencriptación.

**Retorna:** Promesa que resuelve en el texto desencriptado.

## Pruebas

El módulo **NativeEncrypt.js** fue testeado en los siguientes navegadores:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera
- Brave
- Vivaldi

El módulo fue probado en sistemas operativos Windows, macOS y Linux.

**Todas las pruebas se realizaron con éxito y el módulo se comportó de manera consistente en todos los entornos.**

## Contribuir

Si deseas contribuir a **NativeEncrypt.js**, por favor sigue estos pasos:

1. Realiza un fork del repositorio de desarrollo `https://github.com/Ohyoo-Labs/nativeencrypt-dev.git`.
2. Crea una nueva rama (`git checkout -b feature/feature-name`).
3. Realiza los cambios necesarios y haz commit de tus cambios (`git commit -am 'Add new feature'`).
4. Realiza un push a la rama (`git push origin feature/feature-name`).
5. Crea un nuevo Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. En el archivo `LICENSE` encontrarás más información sobre la licencia.

## Contacto

Si tienes alguna pregunta o sugerencia, por favor contáctanos a través de nuestro correo electrónico:
[ohyoo.labs@yahoo.com](mailto:ohyoo.labs@yahoo.com)

¡Gracias por tu interés en **NativeEncrypt.js**!