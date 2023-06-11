const express = require('express');
const multer = require('multer');
const path = require('path');
const { User } = require('../db/models');

const router = express.Router();

// Конфигурация Multer
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

module.exports = router;
