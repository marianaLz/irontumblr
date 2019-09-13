const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const uploadCloud =require('../config/cloudinary')

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect("/");
  }
};

router.get('/createpost', isLoggedIn, (req, res) => {
  res.render('post-add')
})

router.post('/post/add', uploadCloud.single('photo'),async(req,res) => {
  let {content} = req.body
  let picName = req.file.originalname
  let  picPath=req.file.url
  await Post.create({content,picName,picPath})
  res.redirect('/')
})


module.exports = router;