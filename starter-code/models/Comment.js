const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
    authorId: {
    type: Schema.Types.ObjectId,
    ref:'Post',
  },
  comImgName: String,
  comImgPath: String,
},
{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);