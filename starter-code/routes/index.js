const express = require("express");
const router = express.Router();
const uploadCloud = require('../config/cloudinary');
const Post = require('../models/Post');

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

/* GET home page */
router.get("/", isLoggedIn, async (req, res)  => {
  const posts = await Post.find()
  console.log(posts)
  res.render("index",{posts});
});

router.get('/private', isLoggedIn, (req, res) => {
  res.render('private')
});

router.get('/new-post', isLoggedIn, (req, res) => {
  res.render('post/new-post')
});

router.post('/new-post', isLoggedIn, uploadCloud.single('photo'), async (req, res) => {
  const { content } = req.body
  const {originalname:picName, url:picPath} = req.file
  //const creatorId = req.user._id //no lo reconoce
  await Post.create({ content, picName, picPath })
  res.redirect('/')
});

router.get('/new-comment/:id', isLoggedIn, (req, res) => {
  res.render('private')
});

module.exports = router;
