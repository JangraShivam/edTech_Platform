const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("Database connected successfully")})
    .catch((err) =>{
        console.log("Database connection failed");
        console.log(err);
        process.exit(1);
    })
};