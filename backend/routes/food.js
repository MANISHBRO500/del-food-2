const express = require('express');
const Food = require('../models/Food');

const router = express.Router();

// Add Food
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    const newFood = new Food({ name, price });
    await newFood.save();
    res.status(201).json(newFood);
});

// Get All Food Items
router.get('/', async (req, res) => {
    const foodItems = await Food.find();
    res.json(foodItems);
});

module.exports = router;
