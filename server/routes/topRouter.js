const express = require('express');
const { Item } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Item.findAll({
      limit: 5,
      order: [['price', 'DESC']],
    });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});
module.exports = router;
