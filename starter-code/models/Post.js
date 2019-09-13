const {Schema, model} = require('mongoose');

// const commentSchema = new Schema ({
//   content: String,
//   authorId: {
//     type: Schema.Types.ObjectId, ref: 'User'
//   },
//   imagePath : String,
//   imageName: String

// })

const postSchema = new Schema({
  content: String,
  creatorId : {
    type: Schema.Types.ObjectId, ref:'User'
  },
  picPath: String,
  picName : String,
  //comments: [commentSchema]
})

module.exports = model ('Post',postSchema);