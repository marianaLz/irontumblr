const {Schema, model} = require('mongoose');
const postSchema = new Schema(
  {
    content: String,
    creatorId: String,
    picPath: String,
    picName: String,
    comments: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);
module.exports = model('Post', postSchema);
