const httpStatus = require('http-status-codes');
const authService = require('../services/authService');

module.exports = {
    async upsertAuthData(req,res) {
        try {
            let response = await authService.upsertAuthData(req.body.code);
            return res.status(response.httpStatus).send(response);
        } catch(err) {
            console.log('Error in upsertAuthData in authController.');
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error creating tokens.');
        }
    }
};
