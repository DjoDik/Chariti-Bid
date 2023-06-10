const express = require('express');
const { v4: uuidv4 } = require('uuid');
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
userItemRouter.patch('/:id', async(req,res) => {
    try{
    const findEdit = await Item.findByPk({where:{id: req.params.id}})
    res.json(findEdit)
    } catch {
        res.sendStatus(500)
    }
})

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
    uuid: uuidv4()
  });
  res.json(newItem);
} catch (error) {
  res.sendStatus(401);
}
});


module.exports = userItemRouter;
