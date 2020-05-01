const mongoose = require('mongoose');

let connection;

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
require('./models/spotify');

//Export connection
module.exports.dbConnection = () => getDBConnection();