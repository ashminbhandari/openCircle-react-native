const mongoose = require('mongoose');

let connection;

/**/
/*

 getDBConnection

 NAME

   getDBConnection - sets up and gets the database connection

 SYNOPSIS

    async getDBConnection()

 DESCRIPTION

    Sets up a MongoDB database connection using mongoose and
    returns that connection object

 RETURNS

   Connection object

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
let getDBConnection = async () => {
    try {
        connection = await mongoose.connect(process.env.OPENCIRCLE_MONGODB_URL,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (error) => {
                if(error) {
                    console.log("Error establishing Mongo connection.");
                    return;
                }
            });
        console.log("MONGO Connection established successfully.");
    } catch(err) {
        console.log ("Error connecting to the database");
    }
    return connection;
}

//Initializing the models and registering them to their models
require('./models/users');

//Export connection
module.exports.dbConnection = () => getDBConnection();