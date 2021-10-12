const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  slug: {
    type: String
  },
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

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;
