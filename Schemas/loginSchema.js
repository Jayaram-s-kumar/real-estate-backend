const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String  
    },
    otp:{
        type:String
    },
    profimgLink:{
        type:String
    },
    address:{
        type:String
    }
})
 

mongoose.model('logininfo',loginSchema)
