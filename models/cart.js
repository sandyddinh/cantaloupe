const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    product: Object,
    totalPrice: Number,
    totalQty: Number
});

module.exports = model('Cart', cartSchema);