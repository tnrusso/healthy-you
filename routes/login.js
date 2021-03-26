const express = require('express');
const router = express.Router();
const db = require('../db/index')
const user = require('../db/models/user');
const doctor = require('../db/models/doctor');
const writer = require('../db/models/writer')
const bcrypt = require('bcrypt')

router.use(express.json());

router.post("/", async (req, res) => {
  // destructing properties from req.body
  const { email, password, role } = req.body;

  if (role == "User") {
    const userResult = await user.findOne({
      where: {
          email: email
      }
    })
    if (!userResult) {
      res.json({
        target: "email",
        status: "User does not exist!"
      })
    }
    const dbPassword = userResult.password
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.json({
          target: "password",
          status: "Password is incorrect!"
        })
      } else {
          res.status(200).json({
          status: "success",
        })
      }
    })
  } 
  else if (role == "Doctor") {
    const doctorResult = await doctor.findAll({
      where: {
          email: email
      }
    })
    if (!doctorResult) {
      res.json({
        status: "Doctor does not exist!",
      })
    }
    res.status(200).json({
      status: "success",
      data: doctorResult
    })
  } 
  else {
    const writerResult = await writer.findAll({
      where: {
          email: email
      }
    })
    if (!writerResult) {
      res.json({
        status: "Writer does not exist!",
      })
    }
    res.status(200).json({
      status: "success",
      data: writerResult
    })
  }

})

// router.get("/:id", async (req, res) =>{
//     try {
//         str = req.params.id
//         const userInfo = str.split(' ');
//         const username = userInfo[0];
//         const password = userInfo[1];
//         const userResults = await user.findOne({
//            where:{
//              email: username,
//              password: password
//            }, 
//           raw: true
//         });

//         console.log("here is the user id", userResults); 
//         uniqueID = userResults.user_id

//         const doctorResults = await doctorUser.findOne({
//             where:{
//                 doctor_id: uniqueID
//             }, 
//             raw: true
//           });

//         if ( userResults.role === "User" ){
//         res.status(200).json({

//           status: "success",
//           data: userResults
//         })
//     }
//     else{
//         res.status(200).json({

//             status: "success",
//             data: doctorResults
//           })
//     }
//       } 
//     catch (err) {
//         console.error(err.message);
//     }
// });

module.exports = router;