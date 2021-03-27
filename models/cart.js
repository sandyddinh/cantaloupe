const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    items: Object,
    totalPrice: Number,
    totalQty: Number
});

module.exports = model('Cart', cartSchema);