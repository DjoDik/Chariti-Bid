const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const session = require('express-session');
const { User } = require('../db/models');

const router = express.Router();
const sessionSecret = process.env.SESSION_SECRET;
// Конфигурация Multer для обработки загруженных файлов
const storage = multer.memoryStorage(); // Используем memoryStorage, чтобы получить данные изображения в виде буфера
const upload = multer({ storage });
router.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  }),
);
router.post('/signup', upload.single('avatar'), async (req, res) => {
  const { username, email, password, phone } = req.body;
  const avatar = req.file; // Загруженный файл доступен через req.file

  if (username && email && password && phone && avatar) {
    try {
      const avatarData = avatar.buffer.toString('base64'); // Преобразуем данные изображения в base64-строку

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, password: await bcrypt.hash(password, 10), avatar: avatarData }, // Сохраняем данные изображения в поле avatar базы данных
      });
      if (!created) return res.sendStatus(401);

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
