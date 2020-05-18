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
};
