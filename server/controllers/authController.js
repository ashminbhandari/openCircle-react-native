const httpStatus = require('http-status-codes');
const authService = require('../services/authService');

module.exports = {
    async createUser(req, res) {
        try {
            let response = await authService.createUser(req.body.code, req.body.auth.password);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in createUser in authController.', err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error creating user.');
        }
    },

    async generateToken(req,res) {
        try {
            let response = await authService.generateToken(req.body.email);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in generateToken in authController', err);
            return res.status(httpStatus.BAD_REQUEST).send('Said account does not exist or some other error.')
        }
    },

    async checkCode(req,res) {
        try {
            let response = await authService.checkCode(req.body.email, req.body.code);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in generateToken in authController', err);
            return res.status(httpStatus.BAD_REQUEST).send('Said account does not exist or some other error.')
        }
    },

    async newPassword(req,res) {
        try {
            let response = await authService.newPassword(req.body.email, req.body.password);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in generateToken in authController', err);
            return res.status(httpStatus.BAD_REQUEST).send('Said account does not exist or some other error.')
        }
    }
};
