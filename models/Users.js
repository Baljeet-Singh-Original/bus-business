const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, name: {
        type: String,
        required: true

    },
    company: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    contact: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    buses: [{
        name: {
            type: String,
            required: true

        },
        company: {
            type: String,
            required: true

        },
        stops: {
            type: [String],
            required: true

        },
        date: {
            type: Date,
            default: Date.now
        }

    }],
    date: {
        type: Date,
        default: Date.now
    }

});



module.exports = User = mongoose.model('business', UserSchema);