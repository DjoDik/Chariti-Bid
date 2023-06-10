const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, phone } = req.body;
  console.log(req.body);
  if ((username && email && password, phone)) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, password: await bcrypt.hash(password, 10), phone },
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

router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  console.log("Reqqqqqqqqqqqqqqqqqqqqq",req.body);
  if (email && oldPassword && newPassword) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.sendStatus(401);
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});
module.exports = router;
