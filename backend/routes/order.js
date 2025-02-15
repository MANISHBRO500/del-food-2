const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Get All Orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// Update Order Status
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedOrder);
});

module.exports = router;
