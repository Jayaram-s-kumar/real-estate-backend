var express = require('express');
var router = express.Router();

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

module.exports = router;
