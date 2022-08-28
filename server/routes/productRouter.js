const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.get('/slug', async (req, res) => {
  const { slug } = req.query;
  try {
    let product = await Product.findOne({ slug: slug });
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Something went wrong' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.get('/id', async (req, res) => {
  const { id } = req.query;
  try {
    let product = await Product.findOne({id:id});
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

module.exports = router;
