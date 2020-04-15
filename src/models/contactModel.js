const mongoose = require('../database/index');
const mongoosePaginate = require('mongoose-paginate');

const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    lastname: {
        type: String,
    },
    phones:{},
    emails:{},
    addresses:{},
    username:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

ContactSchema.plugin(mongoosePaginate);
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;