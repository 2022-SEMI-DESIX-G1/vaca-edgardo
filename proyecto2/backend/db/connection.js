require('dotenv').config();
const mongoose = require('mongoose');

const username = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const database = process.env.DB_NAME; 

const connectionDB = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@${database}.0y0h2.mongodb.net/?retryWrites=true&w=majority`);
        console.log('Successful DB connection.');
    }
    catch(error) {
        console.log(error);
        throw new Error('Error trying to connect to DB.');
    }
}

module.exports = {
    connectionDB
}