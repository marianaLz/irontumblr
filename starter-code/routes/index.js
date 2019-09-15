const express = require("express");
const router = express.Router();
const Post = require('../models/Post');

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

/* GET home page */
router.get("/", isLoggedIn, async(req, res) => {
  const posts = await Post.find().populate('creator')
  res.render("index", {posts});
});

router.get('/private', isLoggedIn, (req, res) => {
  res.render('private')
});

module.exports = router;
