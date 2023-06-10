const express = require('express');
const { Item } = require('../db/models');

const userItemRouter = express.Router();

userItemRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Item.findAll({ where: { user_id: id } });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

userItemRouter.delete('/:id', async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

userItemRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, city, price } = req.body;
    const item = await Item.findByPk(id);
    if (!item) {
      res.sendStatus(404);
    }
    item.title = title;
    item.body = body;
    item.city = city;
    item.price = price;

    await item.save();

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = userItemRouter;
