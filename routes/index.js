var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')


const mongoose = require('mongoose');



const loginModel = mongoose.model('logininfo')
const propertyModel = mongoose.model('propertyDetails')
const carModel = mongoose.model('carDetails')

router.post('/signup', async (req, res) => {
  let exist = await loginModel.findOne({ email: req.body.email })
  if (exist) {

    return res.send({ "message": "email already exist" })
  } else {
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


router.post('/uploadProp', async (req, res) => {
  console.log("Enterd in upload ")
  const newmodel = new propertyModel(req.body)
  await newmodel.save().then((response) => {
    res.send(response)
  })

})

router.get('/first3houses', async (req, res) => {
  let data = await propertyModel.find({ "propType": { $ne: "Apartments" } }).sort({ _id: -1 }).limit(3).lean()
  res.send(data)
  console.log("first3houses called")
})

router.get('/first3apartments', async (req, res) => {
  let data = await propertyModel.find({ "propType": "Apartments" }).sort({ _id: -1 }).limit(3).lean()
  res.send(data)
  console.log("first3apartments called")
})


router.get('/getPropData/:ID', async (req, res) => {
  try {
    const data = await propertyModel.findOne({ _id: req.params.ID });
    if (!data) {
      return res.status(404).json({ error: 'Property not found' });
    }
    console.log("getPropData called", data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/getcardata/:ID', async (req, res) => {
  console.log("Enterd into get cardata")
  try {
    const data = await carModel.findOne({ _id: req.params.ID });
    if (!data) {
      return res.status(404).json({ error: 'Car not found' });
    }
    console.log("getcardata called", data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})


router.get('/getallhouses', async (req, res) => {
  let data = await propertyModel.find({ "propType": { $ne: "Apartments" } }).sort({ _id: -1 }).lean()
  res.send(data)
  console.log('getallhouse called')
})


router.get('/getallapartments', async (req, res) => {
  let data = await propertyModel.find({ "propType": "Apartments" }).sort({ _id: -1 }).lean()
  res.send(data)
  console.log('getallhouse called')
})

router.post('/sendinforeq', (req, res) => {
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


router.post('/uploadCar', async (req, res) => {
  console.log("Enterd in car upload ")
  const newmodel = new carModel(req.body)
  await newmodel.save().then((response) => {
    res.send(response)
  })

})



router.get('/first3cars', async (req, res) => {
  let data = await carModel.find({}).limit(6).sort({ _id: -1 }).lean()
  res.send(data)
  console.log(data)
  console.log("first3cars called")
})


router.get('/getallcars', async (req, res) => {
  let data = await carModel.find({}).sort({ _id: -1 }).lean()
  res.send(data)
  console.log('getallcars called')
})

router.get('/getmyproperties/:ID', async (req, res) => {
  let data = await propertyModel.find({ ownerID: req.params.ID }).lean()
  res.send(data)
  console.log("Enterd into my proprties")
})

router.get('/getmycars/:ID', async (req, res) => {
  let data = await carModel.find({ ownerID: req.params.ID }).lean()
  res.send(data)
  console.log("Enterd into my cars")
})

router.get('/deleteprop/:ID', async (req, res) => {
  await propertyModel.deleteOne({ _id: req.params.ID })
  console.log('Enterd into delete property')
  res.send({ message: 'deleted' })
})

router.get('/deletecar/:ID', async (req, res) => {
  await carModel.deleteOne({ _id: req.params.ID })
  console.log('Enterd into delete car')

  res.send({ message: 'deleted' })
})


const SendOtp = (email) => {
  OTP = ''
  const user = "lensikoviski@gmail.com"
  const password = "yjeg ywmv wsvb jrab"
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: password
    }
  })

  var digits = '0123456789';

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  try {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Password reset",
      html: `<h1>Email confirmation</h1>
                  <p>hello ${email}</P>
                  <p>Your otp for password resetting is  <b> ${OTP} </b></P>`
    })
    console.log("otp send to", email)
  } catch (error) {
    console.log("error is:", error)
  }
  return OTP
}

router.post('/sendregemail', async (req, res) => {
  let ifexist = await loginModel.findOne({ email: req.body.email });
  if (ifexist) {
    const otp = SendOtp(req.body.email);
    await loginModel.findOneAndUpdate({
      email: ifexist.email,
      password: ifexist.password,
      $set: {
        otp
      }
    });

    res.send({ message: 'email exist' });
  } else {
    res.send({ message: 'email not registerd' });
  }
  console.log('ENTERD into regemail');
});


router.post('/resend-otp', async (req, res) => {
  let email = req.body.email;
  let otp = SendOtp(email)
  await loginModel.updateOne({ email: req.body.email }, {
    $set: {
      otp
    }
  })
  console.log("Enterd into resend otp")
  console.log(otp)
})

router.post('/verify-otp', async (req, res) => {
  let userOtp = req.body.otp
  let dbOtp = (await loginModel.findOne({ email: req.body.email })).otp
  if (userOtp === dbOtp) {
    res.send({ message: 'otp match' });
  } else {
    res.send({ message: 'otp not match' });
  }
  console.log("userOtp is", userOtp)
  console.log("dBOtp is", dbOtp)
})

router.post('/updatepass', async (req, res) => {
  console.log("Enterd into new pass")
  await loginModel.findOneAndUpdate({ email: req.body.email }, {
    $set: {
      password: req.body.password
    }
  })
  res.send({ message: 'password changed' })
})

router.post('/upprofimg', async (req, res) => {
  console.log(req.body)
  console.log("profile image called")
  console.log(req.body.profileimg)
  await loginModel.updateOne({
    _id: req.body.loginID
  }, {
    $set: {
      profimgLink: req.body.profileimg
    }
  }).then(data => console.log(data))

})

router.get('/getprofimg/:loginID', async (req, res) => {
  console.log("get profile image called")
  // console.log(req.params)
  let dbdata = await loginModel.findOne({ _id: req.params.loginID })
  res.send(dbdata)

})

router.post('/addaddress', async (req, res) => {
  console.log("add adress called")
  console.log(req.body)
  await loginModel.updateOne({
    _id: req.body.loginID
  }, {
    $set: {
      address: req.body.address
    }
  }).then(data => console.log(data))

})



module.exports = router; 
