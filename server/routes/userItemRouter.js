const express = require('express');
const { Item } = require('../db/models');

const userItemRouter = express.Router();

userItemRouter.get('/:id', async (req, res) => {
  console.log('TUTA!!!!=====================',req.params.id);
  try {
    const data = await Item.findAll({ where: { user_id: req.params.id } });
    res.json(data);
  } catch (err) {
    res.sendStatus(500)
  }
});

module.exports = userItemRouter;
