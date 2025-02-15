const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
