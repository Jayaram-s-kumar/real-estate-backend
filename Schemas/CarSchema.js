const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    carbrand:{
        type:String,
        required:true
    },
    ownerID:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    transmission:{
        type:String,
        required:true
    },
    noofowners:{
        type:String,
        required:true
    },
    kmdriven:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image1Link:{
        type:String,
        required:true
    },
    image2Link:{
        type:String,
        required:true
    },
    image3Link:{
        type:String,
        required:true
    },
    image4Link:{
        type:String,
        required:true
    },
    image5Link:{
        type:String,
        required:true
    },
    
})


mongoose.model('carDetails',carSchema)
