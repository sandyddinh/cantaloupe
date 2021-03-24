const Item = require('../models/item');
const express = require('express');
const itemRouter = express.Router();

// Create
itemRouter.post('/', async (req, res) => {
    try{
        const newItem = await Item.create(req.body);
        res
          .status(200)
          .json(newItem)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read - Index
itemRouter.get('/', async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res
          .status(200)
          .json(foundItems)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read - Show
itemRouter.get('/:id', async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.id);
        res
          .status(200)
          .json(foundItem)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Update
itemRouter.put('/:id', async (req, res) => {
    try {
        const foundItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res
          .status(200)
          .json(foundItem)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Delete
itemRouter.delete('/:id', async (req, res) => {
    try {
        const foundItem = await Item.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json(foundItem)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

module.exports = itemRouter;