const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate=require('../../utils/Validator');

router.post("/", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  User.sync().then(() => {
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

router.post("/register", (req, res) => {
  const {isValid,errors}=validate(req.body);
  const { email, password, firstName, lastName, phone, dateOfBirth } = req.body;


  if(!isValid){
    return res.status(400).json({success:false,errors});
  }


  User.findAll({
    where: {
      email
    }
  })
    .then(user => {
      if (user.length > 0) {
        errors.email="User already exists";
        return res.status(400).json({success:false,errors});
      }

      bcrypt
        .hash(password, 10)
        .then(hash => {
          const newUser = {
            firstName,
            lastName,
            email,
            phone:'9999999999',
            password: hash,
            dateOfBirth: Date.now()
          };
          User.sync().then(() => {
            User.create(newUser).then(user => {
              jwt.sign(newUser, "secret", (err, token) => {
                if (err) {
                  errors.err=err;
                  return res.status(400).json({success:false,errors});
                }

                return res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`
                });
              });
            });
          });
        })
        .catch(err => res.status(400).json({success:false,errors}));
    })
    .catch(err => res.status(400).json({ success: false, errors }));
});

router.post("/login", (req, res) => {

  const {isValid,errors}=validate(req.body);
  
  if(!isValid){
    return res.status(400).json({success:false,errors});
  }

  const { email, password } = req.body;
  User.findAll({
    where: {
      email
    }
  })
    .then(user => {
      if (user.length === 0) {
        errors.email='No user found';
            return res.status(400).json({success:false,errors});
      }
      bcrypt.compare(password, user[0].dataValues.password).then(isAMatch => {
        if (!isAMatch) {
          errors.password='Incorrect Password';
            return res.status(400).json({success:false,errors});
        }
        const {
          id,
          email,
          firstName,
          lastName,
          phone,
          dateOfBirth
        } = user[0].dataValues;

        jwt.sign(
          { id, email, firstName, lastName, phone, dateOfBirth },
          "secret",
          { expiresIn: 60 },
          (err, token) => {
            if (err) {
              throw err;
            }

            return res.status(200).json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      });
    })
    .catch(err => res.status(400).json({success:false,errors}));
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("logged in");
  }
);

router.delete("/", (req, res) => {
  User.destroy({
    where: {
      firstName: "Farrukh"
    }
  })
    .then(user => {
      console.log("done");
      return res.json({ done });
    })
    .catch(err => console.log("err"));
});

module.exports = router;
