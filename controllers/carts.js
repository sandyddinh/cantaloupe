const Cart = require('../models/cart');
const express = require('express');
const cartRouter = express.Router();

// Create
cartRouter.post('/', async (req, res) => {
    try{
        const newCart= await Cart.create(req.body);
        res
          .status(200)
          .json(newCart)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read - Index
cartRouter.get('/', async (req, res) => {
    try {
        const foundCart = await Cart.find({});
        res
          .status(200)
          .json(foundCart)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read - Show
cartRouter.get('/:id', async (req, res) => {
    try {
        const foundCart = await Cart.findById(req.params.id);
        res
          .status(200)
          .json(foundCart)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Update
cartRouter.put('/:id', async (req, res) => {
    try {
        const foundCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res
          .status(200)
          .json(foundCart)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Delete
cartRouter.delete('/:id', async (req, res) => {
    try {
        const foundCart = await Cart.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json(foundCart)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

module.exports = cartRouter;