const express = require('express');
const multer = require('multer');
const path = require('path');
const { FotoGalery } = require('../db/models');

const router = express.Router();

// Конфигурация Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photo'); // Указываем папку для сохранения файлов
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = file.originalname;
    cb(null, filename); // Указываем имя файла
  },
});

const upload = multer({ storage });

// Ручка для загрузки фотографий
router.post('/photos/:itemId', upload.array('photos'), async (req, res) => {
  try {
    const { itemId } = req.params;

    // Проверка наличия itemId
    if (!itemId) {
      res.status(400).json({ message: 'No item_id provided' });
      return;
    }

    // Проверка наличия загруженных файлов
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ message: 'No files uploaded' });
      return;
    }

    // Создание объектов FotoGallery и сохранение их в базе данных
    const photos = req.files.map((file) => ({
      img: file.originalname,
      item_id: itemId, // Добавляем itemId в объект фотографии
    }));

    const createdPhotos = await FotoGalery.bulkCreate(photos);
    console.log('=========<<<<<<,', createdPhotos);
    res.json(createdPhotos);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.get('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const photos = await FotoGalery.findAll({ where: { item_id: id } });
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.delete('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('-----------444????444>>>', id);
    const deletedPhoto = await FotoGalery.destroy({ where: { id: parseInt(id) } });
    res.json(deletedPhoto);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
