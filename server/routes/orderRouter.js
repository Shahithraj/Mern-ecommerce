const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const Order = require('../models/orderModel');
const Auth = require('./auth');

router.post('/', Auth, async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.get('/', Auth, async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Order.findById(id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(401).send({ message: 'Order Not Found' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.get('/mine', Auth, async (req, res) => {
  try {
    const orders = await Order.find({user:req.user.id});
    if (orders) {
      res.status(200).send(orders);
    } else {
      res.status(401).send({ message: 'Orders Not Found' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});


router.put('/:id/pay', Auth, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(401).send({ message: 'Order Not Found' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

module.exports = router;
