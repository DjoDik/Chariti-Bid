
const express = require('express');
const { Item } = require('../db/models');

const router = express.Router();


router.post('/updateprice', async (req, res) => {
  const { itemId, newPrice } = req.body;
  
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.sendStatus(404);
    }
    item.price += newPrice;
    await item.save();
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
