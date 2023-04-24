var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')


const mongoose = require('mongoose');
const { response } = require('../app');

const loginModel = mongoose.model('logininfo')
const propertyModel = mongoose.model('propertyDetails')

router.post('/signup', async (req, res) => {
  let exist = await loginModel.findOne({ email: req.body.email })
  if (exist) {

    return res.send({ "message": "email already exist" })
  } else {
    console.log(req.body)
    const newmodel = new loginModel()
    newmodel.email = req.body.email
    newmodel.password = req.body.password
    await newmodel.save()

    return res.send({ "message": "user created" })

  }
})

router.post('/signin', async (req, res) => {
  console.log("Enterd in signin")
  let ifExist = await loginModel.findOne(
    {
      email: req.body.email
    }
  )

  if (ifExist) {
    if (req.body.password === ifExist.password) {
      console.log("signed in")
      res.send({
        message: "signed in",
        email: ifExist.email,
        loginID: ifExist._id,
      })
    } else {
      res.send({ message: "password error" })
      console.log("password error")
    }
  } else {
    res.send({ message: "email not registerd" })
    console.log("eamil not registerd")
  }
})


router.post('/uploadProp',async(req,res)=>{
  console.log("Enterd in upload ")
  console.log(req.body)
  const newmodel = new propertyModel(req.body)
  await newmodel.save().then((response)=>{
    res.send(response)
  }) 
 
})

router.get('/first3houses',async(req,res)=>{
  let data  = await propertyModel.find({ "propType": { $ne: "Apartments" } }).limit(3).lean()
  res.send(data)
  // console.log(data)
  console.log("first3houses called")
}) 

router.get('/first3apartments',async(req,res)=>{
  let data  = await propertyModel.find({ "propType": "Apartments" }).limit(3).lean()
  res.send(data)
  // console.log(data)
  console.log("first3apartments called")
}) 


router.get('/getPropData/:ID',async(req,res)=>{
  let data = await propertyModel.findOne({_id:req.params.ID})
  res.send(data)
  console.log(data)
  console.log("getPropData called")
})

router.get('/getallhouses',async(req,res)=>{
  let data  = await propertyModel.find({ "propType": { $ne: "Apartments" } }).lean()
  res.send(data)
  console.log('getallhouse called')
})


router.get('/getallapartments',async(req,res)=>{
  let data  = await propertyModel.find({ "propType": "Apartments" } ).lean()
  res.send(data)
  console.log('getallhouse called')
})

router.post('/sendinforeq',(req,res)=>{
  console.log(req.body)
  res.send("hello")
  console.log("sendinforeq called")
  const user = "lensikoviski@gmail.com"
  const password = "yjeg ywmv wsvb jrab"
  const transport = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: user,
      pass: password
    }
  })  
  try {
    transport.sendMail({
      from: user,
      to: req.body.ownerEmail,
      subject: "Information Request for Property", 
  html: `
    <p>Dear Property Owner,</p>
    <p>You have received a request for more information about the property <strong>${req.body.propName}</strong> from:</p>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone Number: ${req.body.phone}</li>
    </ul>
    <p>Here's the message from the client:</p>
    <p>${req.body.message}</p><br><br>
    <p>Please contact them at your earliest convenience.</p>
    <p>Thank you,</p>
    <p>Your Real Estate Website Team</p>
  `
    })
    console.log("message send to")
  } catch (error) {
    console.log("error is:", error)
  }

})

module.exports = router;
