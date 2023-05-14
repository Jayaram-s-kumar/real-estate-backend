const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({


    "propType": {
        "type": "string",
        required: true
    },
    "propName": {
        "type": "string",
        required: true
    },
    "price": {
        "type": "string",
        required: true
    },
    "ownName":{
        "type": "string",
        required: true
    },
    "phone": {
        "type": "string",
        required: true
    },
    "email": {
        "type": "string",
        required: true
    },
    "sqfeet": {
        "type": "string",
        required: true
    },
    "lotsize": {
        "type": "string",
        required: true
    },
    "year": {
        "type": "string",
        required: true
    },
    "streetAddress": {
        "type": "string",
        required: true
    },
    "city":{
        "type":"string",
        required:true
    },
    "state":{
        "type":"string",
        required:true
    },
    "postalCode":{
        "type":"string",
        required:true
    },
    "furnishType": {
        "type": "string",
        required: true
    },
    "storyType": {
        "type": "string",
        required: true
    },
    "bedrooms": {
        "type": "string",
        required: true
    },
    "bathrooms": {
        "type": "string",
        required: true
    },
    "description": {
        "type": "string",
        required: true
    },
    "image1Link": {
        "type": "string",
        required: true
    },
    "image2Link": {
        "type": "string",
        required: true
    },
    "image3Link": {
        "type": "string",
        required: true
    },
    "image4Link": {
        "type": "string",
        required: true
    },
    "image5Link": {
        "type": "string",
        required: true
    },
    "doc1Link": {
        "type": "string",
        required: true
    },
    "doc2Link": {
        "type": "string",
        required: true
    },
    "ownerID": {
        "type": "string",
        required: true
    },
    "carPorch": {
        "type": "boolean",
        required: true
    },
    "Ac": {
        "type": "boolean",
        required: true
    },
    "Laundary": {
        "type": "boolean",
        required: true
    },
    "Tv": {
        "type": "boolean",
        required: true
    },
    "storage": {
        "type": "boolean",
        required: true
    },
    "internet": {
        "type": "boolean",
        required: true
    },
    "pool": {
        "type": "boolean",
        required: true
    },
    "gate": {
        "type": "boolean",
        required: true
    },
    "camera": {
        "type": "boolean",
        required: true
    },
    "garden": {
        "type": "boolean",
        required: true
    },
    "fitness": {
        "type": "boolean",
        required: true
    },
    "seaview": {
        "type": "boolean",
        required: true
    }
})

mongoose.model('propertyDetails',propertySchema)