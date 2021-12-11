import aesjs from 'aes-js';

export const decrypt = (password, encryptedHexSecret) => {
  const bytes = aesjs.utils.utf8.toBytes(password);
  const aesCtr = new aesjs.ModeOfOperation.ctr(bytes);
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHexSecret);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
};

export const encrypt = (password, textToEncrypt) => {
  const bytes = aesjs.utils.utf8.toBytes(password);
  const aesCtr = new aesjs.ModeOfOperation.ctr(bytes);
  const textBytes = aesjs.utils.utf8.toBytes(textToEncrypt);
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
};
