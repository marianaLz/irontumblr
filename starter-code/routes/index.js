const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
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

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

/* GET home page */
router.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {pictures: posts});
});

router.get('/private', isLoggedIn, (req, res) => {
  res.render('private');
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render('new');
});

router.post('/new', isLoggedIn, upload.single('photo'), async (req, res) => {
  await Post.create({
    creatorId: req.session.currentUser._id,
    content: req.body.content,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.body.name
  });
  res.redirect('/');
});

module.exports = router;
