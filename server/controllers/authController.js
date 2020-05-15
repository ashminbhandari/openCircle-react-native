const httpStatus = require('http-status-codes');
const authService = require('../services/authService');

module.exports = {

    /**/
    /*

     createUser

     NAME

       createUser - create user route controller

     SYNOPSIS

        const createUser(req, res)

            req -> request object
            res -> response object

     DESCRIPTION

        Forwards request over to service

     RETURNS

       Response object with status code and message

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    async createUser(req, res) {
        try {
            let response = await authService.createUser(req.body.code, req.body.auth.password);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in createUser in authController.', err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error creating user.');
        }
    },
};
