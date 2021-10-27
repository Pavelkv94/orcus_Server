const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pass: {
        type: String,
        required: true
    },
    
});

const User = mongoose.model('User', schema);

module.exports = User;


