const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    userImg: {
      type: String,
      default: 'https://techinfofeed.com/wp-content/uploads/2019/02/cute-whatsapp-dp-images-40.jpg'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
