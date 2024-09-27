const express = require('express');
const Post = require('../models/Post');
const app = express();
const Category = require('../models/Categories');
const User = require('../models/User');
const roleMiddleware = require('./auth/middleware/roleMiddleware');
const authMiddleware = require('./auth/middleware/authMiddleware');

// app.post('/categories', roleMiddleware(['admin']), (req, res) => {
//   const { title } = req.body;
//   let newCat = new Category();
//   newCat.title = title;
//   newCat.save((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: err
//       });
//     }
//     res.json(data);
//   });
// });

// app.get('/categories', authMiddleware, (_req, res) => {
//   Category.find({}).exec((err, data) => {
//     if (err) return res.status(400).json({ err });
//     res.json(data);
//   });
// });

// app.get('/posts', authMiddleware, (_req, res) => {
//   Post.find({}).exec((err, data) => {
//     if (err) return res.status(400).json({ err });
//     res.json(data);
//   });
// });

// app.get('/shortPosts', authMiddleware, (_req, res) => {
//   Post.find({}).exec((err, data) => {
//     if (err) return res.status(400).json({ err });
//     res.json(
//       data.map((o) => {
//         return { title: o.title, _id: o._id, category: o.category };
//       })
//     );
//   });
// });
// app.post('/posts', roleMiddleware(['admin']), (req, res) => {
//   const { title, category, text } = req.body;
//   let newPost = new Post();
//   newPost.title = title;
//   newPost.category = category;
//   newPost.text = text;
//   newPost.save((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: err
//       });
//     }
//     res.json(data);
//   });
// });

// app.put('/posts/:id', roleMiddleware(['admin']), (req, res) => {
//   Post.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
//     if (err) {
//       return res.status(400).json({ error });
//     } else {
//       console.log('update success');
//       res.json(data);
//     }
//   });
// });

// app.delete('/posts/:id', roleMiddleware(['admin']), (req, res) => {
//   Post.deleteOne({ _id: req.params.id }, function (err, data) {
//     if (err) {
//       return res.status(400).json({ error });
//     } else {
//       console.log('delete post success');
//       res.json(data);
//     }
//   });
// });

app.get('/main/:id', authMiddleware, (req, res) => {
  Post.find({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

app.get('/test', (_req, res) => {
  res.end('HEllo');
});

app.put('/main/:id', roleMiddleware(['admin']), (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      return res.status(400).json({ error });
    } else {
      console.log('update success');
      res.json(data);
    }
  });
});

module.exports = app;
