const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Item, FotoGalery } = require('../db/models');

const userItemRouter = express.Router();

userItemRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const items = await Item.findAll({ where: { user_id: id } , include: FotoGalery});
    // const itemIds = items.map((item) => item.id);
    // const galleryData = await FotoGalery.findAll({ where: { item_id: itemIds } });
    console.log('===================>', items);
    res.json(items);
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

userItemRouter.post('/', async (req, res) => {
  try {
    const { title, body, city, category_id } = req.body;
    const newItem = await Item.create({
      user_id: req.session.user.id,
      title,
      body,
      city,
      category_id: Number(category_id),
      price: 0,
      sellStatus: false,
      lastUser_id: null,
      uuid: uuidv4(),
    });

    res.json(newItem);
    // console.log('55555555sdddddddewfw----->', newItem);
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = userItemRouter;
