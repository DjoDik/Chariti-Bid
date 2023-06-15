const express = require('express');
const { Item, FotoGalery,User } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('TUUUUUUUUUUUUUUUUUUUUUUT');
  try {
    const data = await Item.findAll({
      where: {
        lastUser_id: id,
        sellStatus: true,
      },
      include: [
        {
          model: FotoGalery,
        },
        {
          model: User,
          
        },
      ],
    });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
