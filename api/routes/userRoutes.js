const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


router.post("/", (req, res) => {
  const { firstName, lastName, email, phone,password } = req.body;

  User.sync({force:true}).then(() => {
    User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth: Date.now()
    })
      .then(user => console.log("user", user))
      .catch(err => console.log("err", err));
  });

  return res.json({ msg: "Users works!" });
});

router.get("/", (req, res) => {
  User.findAll()
    .then(users => {
      if (!users) {
        throw {
          err: "Something went wrong"
        };
      }

      return res.json(users);
    })
    .catch(err => res.json(err));
});

router.post('/register',(req,res)=>{

  const {email,password,firstName,lastName,phone,dateOfBirth}=req.body;

  console.log('req.body',req.body);
  User.findAll({
    where:{
      email
    }
  })
  .then(user=>{
    console.log('user',user);
    if(user.length>0){
      throw 'User already exists';
    }

    bcrypt.hash(password,10)
      .then(hash=>{
        const newUser={
          firstName,
          lastName,
          email,
          phone,
          password:hash,
          dateOfBirth:Date.now()
        };
        User.sync().then(()=>{
          User.create(newUser)
          .then(user=>{
            console.log('user register',user);
            jwt.sign(newUser,'secret',(err,token)=>{

              if(err){
                throw err;
              }

              return res.status(200).json({
                success:true,
                token:`Bearer ${token}`
              });


            })
          })
        })
          
          
        })
      .catch(err=>res.status(400).json(err));

  })
  .catch(err=>res.status(400).json({success:false,err}));


})

router.post('/login',(req,res)=>{
  const {email,password}=req.body;
  console.log('req.body',req.body);
  User.findAll({
    where:{
      email
    }
  })
  .then(user=>{
    // console.log('user',user);
    if(user.length===0){
      throw 'Incorrect email or password';
    }
    console.log('user[0].users',user[0].dataValues);
    bcrypt.compare(password,user[0].dataValues.password)
      .then(isAMatch=>{
        console.log('isAMatch',isAMatch);
        if(!isAMatch){
          throw 'Incorrect email or password';
        }
        const {id,email,firstName,lastName,phone,dateOfBirth}=user[0].dataValues;

        jwt.sign({id,email,firstName,lastName,phone,dateOfBirth},'secret',{expiresIn:60},(err,token)=>{
          if(err){
            throw err;
          }
          
          return res.status(200).json({
            success:true,
            token:`Bearer ${token}`
          });
        })

      })


  })
  .catch(err=>res.status(400).json({success:false,err}));

});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("logged in");
  }
);

router.delete('/',(req,res)=>{
  User.destroy({
    where:{
      firstName:"Farrukh"
    }
  })
  .then(user=>{console.log('done')
  return res.json({done});
})
  .catch(err=>console.log('err'));
})

module.exports = router;
