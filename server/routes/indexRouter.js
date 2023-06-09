const express = require('express');
const { Category, Item } = require('../db/models');


const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  
  try {
    const data = await Category.findAll({ include: { model: Item } });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

indexRouter.post('/', async (req, res) => {
  try {
    // достаем поля, создаем объект
  const { tytle, body, city } = req.body;
  const newAnimal = await Item.create({
    tytle, 
    body, 
    city,
  });// если все поля совпадают можно записать:
  // const newAnimal = await Animal.create(req.body)

  // возвращаем созданный объект на фронт
  res.json(newAnimal);
} catch (error) {
  res.sendStatus(401);
}
});

module.exports = indexRouter;
