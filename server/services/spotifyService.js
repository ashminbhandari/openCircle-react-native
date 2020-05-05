const mongoose = require('mongoose');
const connection = mongoose.connection; //Get the database connection
const httpStatus = require('http-status-codes');

//Extracting the user id
//
module.exports = {
    async gatherOnlineUsers(req, res) {

        //First set the gatherers user location in session
        req.session.location = req.location;
        console.log(req.location);
        console.log(req.session);

        let result;
        try {

            //Get the session collection
            let sessionColl = await connection.collection('sessions');

            //Get a sample of 100 users
            let sample = await sessionColl.aggregate({ $sample: { size: 100 }});

            //Convert the sample cursor object into an array
            let sampleArray = await sample.toArray();

            //Map into an array of user ID's
            let userArray = sampleArray.map(user => JSON.parse(user.session).passport.user);

            //If we reached here means everything went OK, so construct the response object
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
                data: userArray
            };

            return result;
        } catch (error) {
            console.log(error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'User data could not be gathered.'
            };
            return result;
        }
    }
};