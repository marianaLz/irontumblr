const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  title: String,
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  picPath: String,
  picName: String
},
{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);