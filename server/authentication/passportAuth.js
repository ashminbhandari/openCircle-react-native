const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const httpStatus = require('http-status-codes');
const User = require('../database/models/users');

module.exports = {

    //Configures passport
    initializePassport(passport) {

        //Persistent sessions
        passport.serializeUser((user, done) => {
            done(null, user._id)
        });


        passport.deserializeUser(async (id, done) => {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        })

        //Local strategy configuration
        passport.use('login', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            },
            function (email, password, done) {
                //Check if users database has the entry
                User.findOne({'email': email},
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
                        if (!isValidPassword(user, password)) {
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

    isAuthenticated(req, res, done) {
        //Passport adds the isAuthenticated function in req body when authenticated and removes it when session expires
        if (req.isAuthenticated()) {
            done()
        } else {
            return res.status(httpStatus.UNAUTHORIZED).send('Authorization is required...');
        }
    }
};