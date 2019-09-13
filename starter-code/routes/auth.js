const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, crypto.randomBytes(18).toString('hex') + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/signup', (req, res) => {
  res.render('sign-up');
});

router.post('/signup', upload.single('picture'), (req, res) => {
  let {username, password} = req.body;
  if (!password) return res.render('sign-up', {err: 'Empty password'});
  if (!username) return res.render('sign-up', {err: 'Empty username'});
  const salt = 10;
  const bsalt = bcrypt.genSaltSync(salt);
  password = bcrypt.hashSync(password, bsalt);
  console.log(password);
  User.create({
    username,
    password,
    profilePicture: {
      imgPath: `/uploads/${req.file.filename}`
    }
  })
    .then(() => {
      res.redirect('/auth/login');
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;
  User.findOne({username}).then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.render('login', {
        errorMessage: 'Incorrect password'
      });
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
