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
userItemRouter.patch('/:id', async(req,res) => {
    try{
    const findEdit = await Item.findByPk({where:{id: req.params.id}})
    res.json(findEdit)
    } catch {
        res.sendStatus(500)
    }
})


module.exports = userItemRouter;
