const bCrypt  = require('bcrypt-nodejs');

module.exports = {
    createPasswordHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};