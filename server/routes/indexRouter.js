const express = require('express');
const { Category, Item } = require('../db/models');

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  console.log('я в ручке ало');
  try {
    const data = await Category.findAll({ include: { model: Item } });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = indexRouter;
