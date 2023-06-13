const express = require('express');
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
const { User } = require('../db/models');

const router = express.Router();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.mail.ru',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'charitybet@mail.ru',
//     pass: 'EacBhrUafgGQYN4jU9Bj',
//   },
// });

router.post('/signup', async (req, res) => {
  const { username, email, password, phone } = req.body;
  
  if (username && email && password && phone) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, password: await bcrypt.hash(password, 10), phone },
      });
      if (!created) return res.sendStatus(401);

      // Отправка письма пользователю

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      // sessionUser.onlinestatus = true; // Установка статуса аутентификации на true
      req.session.user = sessionUser;
      const { id } = sessionUser;
      const sevUser = await User.findOne({ where: { id } });
      sevUser.onlinestatus = true;
      await sevUser.save();
      
      // await transporter.sendMail({
      //   from: 'charitybet@mail.ru',
      //   to: email,
      //   subject: 'Регистрация успешна',
      //   text: 'Вы успешно зарегистрированы на нашем сайте.',
      // });
      
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

      if (!req.session) {
        req.session = {}; // Создание объекта сессии, если он не существует
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      sessionUser.isAuthenticated = true; // Установка статуса аутентификации на true
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});
router.get('/check', async (req, res) => {
  if (req.session.user) {
    const user = await User.findByPk(req.session.user.id);
    if (user) {
      delete user.password;
    }
    return res.json(user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid_socket').sendStatus(200);
});

router.post('/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (newPassword) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.sendStatus(401);
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;

      if (req.body.userName) {
        user.username = req.body.userName;
      }
      if (req.body.newPhone) {
        user.phone = req.body.newPhone;
      }

      await user.save();

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(440);
    }
  }

  return res.sendStatus(500);
});

module.exports = router;
