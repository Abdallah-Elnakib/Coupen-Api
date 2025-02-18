const mongoose = require('mongoose');

const coupenSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
});


const Coupen = mongoose.model('Coupen', coupenSchema);

module.exports = {Coupen};