const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
    creatorId: {
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  picName: String,
  picPath: String,
},
{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);