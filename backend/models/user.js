const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type:String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    domain:{
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema)