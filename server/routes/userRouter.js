const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          res.status(401).send('User does not Exist');
        } else {
          const passwordMatch = await bcrypt.compare(req.body.password, user.password);
          if (!passwordMatch) {
            res.status(401).send('Wrong Password');
          } else {
            const token = await jwt.sign(  { id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
              expiresIn: '30d',
            });
            res.status(201).send({token: token, user: user });
          }
        }
    }
  catch(err) {
    res.status(500).send('Something went wrong')
  }
});

module.exports = router
