import CryptoJS from "crypto-js";

const sKey = "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=";

/* 🔐 Encrypt Request */
export function encryptRequest(data) {
  try {
    const jsonString = JSON.stringify(data);

    const decodedKey = CryptoJS.enc.Base64.parse(sKey);

    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(jsonString),
      decodedKey,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const combined = iv.concat(encrypted.ciphertext);

    return CryptoJS.enc.Base64.stringify(combined);
  } catch (err) {
    console.error("Encryption Error:", err);
    return null;
  }
}

/* 🧹 Clean extra chars */
function removeNoise(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] === "}") {
      return data.slice(0, i + 1);
    }
  }
  return data;
}

/* 🔓 Decrypt Response */
export function decryptResponse(encryptedString) {
  try {
    if (!encryptedString) return null;

    const decodedKey = CryptoJS.enc.Base64.parse(sKey);

    const byteData = CryptoJS.enc.Base64.parse(encryptedString);

    const iv = CryptoJS.lib.WordArray.create(byteData.words.slice(0, 4), 16);

    const cipherText = CryptoJS.lib.WordArray.create(
      byteData.words.slice(4),
      byteData.sigBytes - 16
    );

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherText },
      decodedKey,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const result = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(removeNoise(result));
  } catch (err) {
    console.error("Decryption Error:", err);
    return null;
  }
}