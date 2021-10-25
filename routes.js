const express = require('express');
const Post = require('./models/post');
const server = express();
const Category = require('./models/categories');

server.post('/categories', (req, res) => {
  const { title } = req.body;
  let newCat = new Category();
  newCat.title = title;
  newCat.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(data);
  });
});

// server.put('/categories', (req, res) => {
//   const { newPost, category } = req.body;
//   Category.find({ title: category }, async function (err, data) {
//     if (err) {
//       return res.status(400).json({ error });
//     } else {
//       await Category.updateOne(
//         {$push : {posts: newPost} }
//       );
//       console.log('update category success');
//       res.json(data);
//     }
//   });
// });

server.get('/categories', (_req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

server.get('/posts', (_req, res) => {
  Post.find({}).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

server.post('/posts', (req, res) => {
  const { title, category, text } = req.body;
  let newPost = new Post();
  newPost.title = title;
  newPost.category = category;
  newPost.text = text;
  newPost.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(data);
  });
});

server.get('/main/:id', (req, res) => {
  Post.find({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

server.get('/test', (_req, res) => {
  res.end('HEllo');
});

module.exports = server;
