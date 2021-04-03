const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    product: Object
});

module.exports = model('Cart', cartSchema);