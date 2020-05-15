const bCrypt  = require('bcrypt-nodejs');
const crypto = require('crypto');
module.exports = {

    /**/
    /*

     generateRandomToken

     NAME

       generateRandomToken - generates a random token

     SYNOPSIS

        generateRandomToken()

     DESCRIPTION

        Generates a random token using the crypto library

     RETURNS

        Javascript promise object

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    generateRandomToken() {
        return new Promise((resolve, reject) => {
            // generate reset token
            crypto.randomBytes(20, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const token = buf.toString('hex');
                resolve(token);
            });
        })
    },

    /**/
    /*

     createPasswordHash

     NAME

       createPasswordHash - creates a hash for the password

     SYNOPSIS

        const createPasswordHash(password)

            password -> Password for which hash to be made

     DESCRIPTION

        Generates a hash for provided password

     RETURNS

       Encrypted hashed password

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    createPasswordHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};