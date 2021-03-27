const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: String,
    category: String,
    subCategory: String,
    description: String,
    color: String,
    quantity: Number,
    size: String,
    price: Number,
    image: Array,
    sale: {type: Boolean, default: false},
    salePrice: Number
});

module.exports = model('Item', itemSchema);