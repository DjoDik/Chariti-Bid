const express = require('express');
const multer = require('multer');
const path = require('path');
const { User, Timer } = require('../db/models');

const router = express.Router();

// Конфигурация Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Указываем папку для сохранения файлов
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = file.originalname;
    cb(null, filename); // Указываем имя файла
  },
});

const upload = multer({ storage });

// Ручка для загрузки файла
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    // Доступ к информации о загруженном файле через req.file
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

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

    // Получите название файла с расширением
    const fileName = req.file.originalname;
    console.log('===========----------==', fileName);
    // Обновите поле avatar пользователя с названием файла
    user.avatar = fileName;

    // Сохраните изменения в базе данных
    await user.save();

    res.json({ message: 'File uploaded successfully', user });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



router.post('/timer', async (req, res) => {
  try {
    const [, created] = await Timer.findOrCreate({
      where: { item_id: req.body.item_id },
      defaults: { value: req.body.value }, // Значение по умолчанию, если запись не найдена
    });
    if (created) {
      // Запись была создана
      res.status(201).json({ message: 'Timer created successfully' });
    } else {
      // Запись уже существует
      res.status(200).json({ message: 'Timer already exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/timer/:id', async (req, res) => {
  try {
    const time = await Timer.findOne({ where: { item_id: req.params.id } })
    console.log('timevalue', time.value);
    res.json(time.value)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
