const express = require('express');
const multer = require('multer');
const path = require('path');
const { FotoGalery } = require('../db/models');

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

// Ручка для загрузки фотографий
router.post('/photos', upload.array('photos'), async (req, res) => {
  try {
    // Доступ к информации о загруженных файлах через req.files
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ message: 'No files uploaded' });
      return;
    }

    // Получите id вещи, к которой относятся фотографии
    const { item_id } = req.body;
    console.log(req.body);
    // Проверка наличия id вещи
    if (!item_id) {
      res.status(400).json({ message: 'No item_id provided' });
      return;
    }

    // Создание объектов FotoGallery и сохранение их в базе данных
    const photos = req.files.map((file) => ({
      img: file.originalname,
      item_id,
    }));

    const createdPhotos = await FotoGalery.bulkCreate(photos);

    res.json(createdPhotos);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
