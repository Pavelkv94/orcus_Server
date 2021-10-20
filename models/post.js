const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

  title: {
    type: String
  },
  category: {
    type: String
  },
  text: {
    type: String
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
