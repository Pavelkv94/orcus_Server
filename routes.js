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
  const { slug, title, category, text } = req.body;
  let newPost = new Post();
  newPost.title = title;
  newPost.slug = slug;
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

server.get('/posts/:slug', (req, res) => {
  Post.find({ category: req.params.slug }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

server.get('/main/:id', (req, res) => {
  Post.find({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

// server.post('/dodo', (req, res) => {
// 	const { name, age } = req.body;
// 	let newUser = new User();
// 	newUser.name = name;
// 	newUser.age = age;
// 	newUser.save((err, data) => {
// 	  if (err) {
// 		return res.status(400).json({
// 		  error: err
// 		});
// 	  }
// 	  let newCar = new Car({ marka: 'fiat', hp: '123' });
// 	  newCar.save((err, data) => {
// 		if (err) {
// 		  return res.status(400).json({
// 			error: err
// 		  });
// 		}
// 		res.json(data);
// 	  });
// 	  res.json(data);
// 	});
//   });

//   server.get('/dodo', (_req, res) => {
// 	User.find({}).exec((err, data) => {
// 	  if (err) return res.status(400).json({ error });
// 	  res.json(data);
// 	});
//   });

// app.post("/users", async (request, response) => {
//   const user = new userModel(request.body);

//   try {
//     await user.save();
//     response.send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// app.get("/users", async (request, response) => {
//     const users = await userModel.find({});

//     try {
//       response.send(users);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

module.exports = server;
