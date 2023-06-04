var express = require('express');

require('./Schemas/loginSchema')
require('./Schemas/PorpertySchema')
require('./Schemas/CarSchema')

const dotenv = require('dotenv')
dotenv.config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/seller');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors')
app.use(cors())




app.use('/', indexRouter);
app.use('/seller', usersRouter);
const mongoose = require('mongoose')
const uri = 'mongodb+srv://realestate:121144169@cluster0.21agav8.mongodb.net/realestate?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3001
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
  

db.on('error', (error) => {
    console.error("mongodb connection error", error)
})

db.once('open', function () {
    console.log("Connected to mongodb database")
    app.listen(PORT, () => {
        console.log("App listening on port", PORT)
    })
})    



module.exports = app;
   