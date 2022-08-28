const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const Auth = require('./auth')
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          res.status(401).send({message:'User does not Exist'});
        } else {
          const passwordMatch = await bcrypt.compare(req.body.password, user.password);
          if (!passwordMatch) {
            res.status(401).send({message:'Wrong Password'});
          } else {
            const token = await jwt.sign(  { id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
              expiresIn: '30d',
            });
            res.status(201).send({token: token, user: user });
          }
        }
    }
  catch(err) {
    res.status(500).send({ message: 'Something went wrong' })
  }
});

router.put('/updateProfile', Auth,async (req, res) => {
  try{
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(401).send({message:'User does not Exist'});
      } else {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
          let salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(req.body.password, salt);
        }
        const token = await jwt.sign( {id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
      const updatedUser = await user.save();
      res.status(201).send({token: token, user: user });
      }
  }
catch(err) {
  res.status(500).send({ message: 'Something went wrong' })
}
});


module.exports = router
