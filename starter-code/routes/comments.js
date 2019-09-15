const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const uploadCloud = require('../config/cloudinary')

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/auth/signup')
  }
}

router.get('/createcomment', isLoggedIn, (req, res) => {
  res.render('create-comment')
})

router.post('/createcomment', uploadCloud.single('photo'), async (req, res) => {
  let { content } = req.body
  let comImgName = req.file.originalname
  let comImgPath = req.file.url
  await Comment.create({ content, comImgName, comImgPath })
  res.redirect('/')
})

module.exports = router
