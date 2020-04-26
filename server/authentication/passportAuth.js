const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const httpStatus = require('http-status-codes');
const User = require('../database/models/users');

module.exports = {

    //Configures passport
    initializePassport(passport) {

        //Persistent sessions
        passport.serializeUser((user, done) => {
            done(null, User._id)
        });


        passport.deserializeUser(async (id, done) => {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        })

        //Local strategy configuration
        passport.use('login', new LocalStrategy({
                usernameField: 'spotify_id',
                passwordField: 'password'
            },
            function (spotify_id, password, done) {
                //Check if users database has the entry
                User.findOne({'spotify_id': spotify_id},
                    (err, user) => {
                        //any error, return using done
                        if (err) {
                            return done(err);
                        }

                        //Username does not exist
                        if (!user) {
                            console.log('User not found with the given Spotify identity...');
                            return done(null, false);
                        }

                        //User exists but password did not match
                        if (!isValidPassword(spotify_id, password)) {
                            console.log('Password entered was invalid...');
                            return done(null, false);
                        }

                        //Everything matches and is fine
                        return done(null, user);
                    });
            }));

        let isValidPassword = (user, password) => {
            return bCrypt.compareSync(password, user.password);
        }
    },

    //Passport adds the isAuthenticated function in req body when authenticated and removes it when session expires
    isAuthenticated(req, res, done) {
        if(req.isAuthenticated()) {
            done()
        }
        else {
            return res.status(httpStatus.UNAUTHORIZED).send('Authorization is required...');
        }
    }
}