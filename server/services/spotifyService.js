const mongoose = require('mongoose');
const connection = mongoose.connection; //Get the database connection
const httpStatus = require('http-status-codes');
const User = require('../database/models/users');

//Extracting the user id
//
module.exports = {
    async updateSessionLocation(req) {
        try {
            //Gather information from the request object
            let user = req.session.passport.user; //User ID
            let latitude = req.body.location.coords.latitude; //User's latitude
            let longitude = req.body.location.coords.longitude; //User's longitude

            // //Update user's location information
            // await User.findByIdAndUpdate(user, {
            //     latitude: latitude,
            //     longitude: longitude
            // });

            //Add the location to user's session
            req.session.latitude = latitude;
            req.session.longitude = longitude;

            //If we reach here means the update was without trouble
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
            };

            return result;
        } catch (error) {
            console.log('Error at updateSessionLocation in spotifyService', error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'Session location could not be updated...'
            };
            return result;
        }
    },

    async gatherOnlineUsers() {
        let result;
        try {
            //Get the session collection
            let sessionColl = await connection.collection('sessions');

            //Get a sample of 100 users
            let sample = await sessionColl.aggregate({$sample: {size: 100}});

            //Convert the sample cursor object into an array
            let sampleArray = await sample.toArray();

            //Map into an array of user ID's and their location
            let userArray = sampleArray.map(user => {
                return {
                    id: JSON.parse(user.session).passport.user,
                    latitude: JSON.parse(user.session).latitude,
                    longitude: JSON.parse(user.session).longitude
                }
            });

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