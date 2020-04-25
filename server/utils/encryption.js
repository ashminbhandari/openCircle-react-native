// Nodejs encryption with CTR
const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = {
    encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
    },

    decrypt(ivToken, encToken) {
        let iv = Buffer.from(ivToken, 'hex');
        let encryptedText = Buffer.from(encToken, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
};

