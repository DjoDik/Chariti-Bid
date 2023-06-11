const express = require('express');
const { Category, Item, User } = require('../db/models');

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({ include: { model: Item } });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});
indexRouter.get('/avatar', async (req, res) => {
  try {
    // Получите идентификатор пользователя из сессии
    const { id } = req.session.user;
    console.log('==========', id);

    // Проверка наличия идентификатора пользователя в сессии
    if (!id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Найдите пользователя в базе данных по идентификатору
    const user = await User.findOne({ where: { id } });

    // Проверка наличия пользователя в базе данных
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Получите путь до аватара пользователя
    const avatarPath = user.avatar;
    res.json({ avatarPath });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = indexRouter;
