const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const uploadCloud = require('../config/cloudinary')

router.get('/add', (req, res) => {
  res.render("posts/add");
})

router.post('/add', uploadCloud.single('photo'), async(req, res) => {

  if(req.file){
    const {title, content} = req.body
    const {url: picPath, originalname: picName} = req.file
    const creator = req.session.currentUser

    await Post.create({ title, content, creator, picPath, picName })
    res.redirect('/')
  } else {
    const {title, content} = req.body
    const creator = req.session.currentUser

    await Post.create({ title, content, creator })
    res.redirect('/')
  }
})

router.get('/show/:id', (req, res) => {
  const id = req.params.id
  const post = Post.findById(id)
  console.log({post})
  res.render("posts/show", {post});
})

router.post('/show', uploadCloud.single('photo'), async(req, res) => {

  if(req.file){
    const {title, content} = req.body
    const {url: picPath, originalname: picName} = req.file
    const creator = req.session.currentUser

    await Post.create({ title, content, creator, picPath, picName })
    res.redirect('/')
  } else {
    const {title, content} = req.body
    const creator = req.session.currentUser

    await Post.create({ title, content, creator })
    res.redirect('/')
  }
})

//A VER COMO HAGO LO DE LOS COMENTARIOS

router.get('/comment', (req, res) => {
  res.render("posts/add");
})

router.post('/comment', uploadCloud.single('photo'), async(req, res) => {

  if(req.file){
    const content = req.body.content
    const {url: picPath, originalname: picName} = req.file
    const creator = req.session.currentUser

    await Post.create({ content, creator, picPath, picName })
    res.redirect('/')
  } else {
    const content = req.body.content
    const creator = req.session.currentUser

    await Post.create({ content, creator })
    res.redirect('/')
  }
})

module.exports = router;