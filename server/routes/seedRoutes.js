const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const data = require('../data');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/product', async (req, res) => {
  const products = new Product(req.body);
  try {
    const createdProducts = await products.save();
    res.status(201).json(createdProducts);
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.post('/signup', async (req, res) => {
  const isUser = await User.find({ email: req.body.email });
  if (isUser.length > 0) {
    res.status(401).json('User already exists');
  } else {
    let salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User(req.body);
    try {
      const createdUser = await newUser.save();
      res.status(201).json(createdUser);
    } catch (err) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
});

module.exports = router;
