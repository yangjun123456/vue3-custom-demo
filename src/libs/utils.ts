import CryptoJS from 'crypto-js';
import './sm4-encrypt.js';

declare const SM4:any;

/**
 * aes加密
 * @param fromText 要加密的数据，最好转成字符串传入
 * @param type 类型，加密：encrypt || 解密：decrypt
 */
const aesEncrypt = (fromText: string, type: string = 'encrypt') => {
    const publicKey:string = 'UGpGyqETMLoJmdNj'; // 公钥
    if (type === 'encrypt') { // 加密
        const options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        const key = CryptoJS.enc.Utf8.parse(publicKey);
        const encryptedData = CryptoJS.AES.encrypt(fromText, key, options);
        let encryptedBase64Str = encryptedData.toString().replace(/\//g, '_');
        encryptedBase64Str = encryptedBase64Str.replace(/\+/g, '-');
        return encryptedBase64Str;
    } else { // 解密
        const vals = fromText.replace(/\-/g, '+').replace(/_/g, '/');
        const options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        const key = CryptoJS.enc.Utf8.parse(publicKey);
        const decryptedData = CryptoJS.AES.decrypt(vals, key, options);
        const decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
        return decryptedStr
    }
}

/**
 * sw4加密
 * @param fromText 要加密的数据，最好转成字符串传入
 * @param type 类型，加密：encrypt || 解密：decrypt
 */
const sm4Encrypt = (fromText: string, type: string = 'encrypt') => {
    const publicKey: string = 'asw34a5ses5w81wf'; // 公钥
    if (type === 'encrypt') {
        return SM4.encode({ input: fromText, key: publicKey });
    } else if (type === 'decrypt') {
        return SM4.decode({ input: fromText, key: publicKey });
    }
    return fromText;
};

export {
    aesEncrypt, // aes加密
    sm4Encrypt // sw4加密
};
