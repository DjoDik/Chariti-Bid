const express = require('express');
const { Item, Category } = require('../db/models');

const sortRouter = express.Router();

sortRouter.get('/:id', async (req, res) => {
  try {
    const category = req.params.id;
    let data;

    if (category === 'Все') {
      // Если выбрана категория "Все", получаем все элементы
      data = await Item.findAll({
        include: [Category],
      });
    } else {
      // В противном случае, получаем элементы для указанной категории
      const categoryRecord = await Category.findOne({ where: { name: category } });
      if (!categoryRecord) {
        // Обработка случая, когда категория не найдена
        return res.status(404).json({ error: 'Category not found' });
      }

      data = await Item.findAll({
        where: { category_id: categoryRecord.id },
        include: [Category],
      });
    }

    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = sortRouter;
