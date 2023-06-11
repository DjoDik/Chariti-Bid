const express = require('express');
const multer = require('multer');
const { User } = require('../db/models');

const router = express.Router();

// Конфигурация Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const types = ['image/png', 'imagejpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

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

    // Получите данные изображения из req.file.buffer
    const imageBuffer = req.file.buffer;

    // Сохраните данные изображения в поле avatar пользователя
    user.avatar = imageBuffer;

    // Сохраните изменения в базе данных
    await user.save();

    res.json({ message: 'File uploaded successfully', user });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/photo', upload.array('photo', 5), async (req, res) => {
  const arraaaaaaa = req.files
  arraaaaaaa.forEach((el) => console.log(el.fieldname))

  // Отправка ответа
  res.json({ message: 'Файл успешно загружен' });
});

module.exports = router;
