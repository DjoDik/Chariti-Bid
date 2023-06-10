const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User } = require('../db/models');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'charitybet@mail.ru',
    pass: 'EacBhrUafgGQYN4jU9Bj',
  },
});

router.post('/signup', async (req, res) => {
  const { username, email, password, phone, avatar } = req.body;
  if (username && email && password && phone) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, password: await bcrypt.hash(password, 10), phone, avatar },
      });
      if (!created) return res.sendStatus(401);

      // Отправка письма пользователю
      await transporter.sendMail({
        from: 'charitybet@mail.ru',
        to: email,
        subject: 'Регистрация успешна',
        text: 'Вы успешно зарегистрированы на нашем сайте.',
      });

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      console.log('------------------>',sessionUser);
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
