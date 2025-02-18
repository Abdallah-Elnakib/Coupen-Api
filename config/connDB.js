const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASEURL)
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = {connectDB}