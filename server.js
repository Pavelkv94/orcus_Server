// const next = require('next');
// const request = require('request');
// const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require("./routes")
const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

// Установим подключение по умолчанию
mongoose
//   .connect(`mongodb://127.0.0.1/orcusDataBase`)
.connect("mongodb+srv://pavelkv94:157842@clusterfortgbot.hi5sp.mongodb.net/Orcus?retryWrites=true&w=majority")
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
  });

// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;

// Получение подключения по умолчанию
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const server = express();
server.use(cors({ origin: "http://localhost:3000" }))
server.use(cors({ origin: "https://pavelkv94.github.io/orcus_redeploy/" }))
server.use(express.json());
server.use(Router);

server.listen(port, () => {
  console.log('Server is running at port 3002');
});




// const port = process.env.PORT || 3002;
// const username = 'pavelkv94';

// const cluster = '<cluster name>';
// const dbname = 'myFirstDatabase';
// (async () => {
//   const app = express();
//   //   app.use(cors({ origin: "http://localhost:3002/" }));
//   // app.use(bodyParser.urlencoded({ extended: false }));
//   // app.use(bodyParser.json());

//   app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// })();

// (async () => {
//   await app.prepare();
//   const server = express();

//   mongoose
//     .connect(process.env.DATABASE_LOCAL, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log("DB connected"))
//     .catch((err) => {
//       console.log(err);
//     });

//   const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];

//     if (!bearerHeader) return res.sendStatus(401);

//     const token = bearerHeader.split(" ")[1];
//     User.findOne({ token: token }).exec((err, result) => {
//       if (err) return res.sendStatus(500);
//       next();
//     });
//   };

//   const template = fs.readFileSync("email_templates/email.hjs", "utf-8");
//   const compiledTemplate = Hogan.compile(template);
//   const newRequest = fs.readFileSync(
//     "email_templates/new_request.hjs",
//     "utf-8"
//   );
//   const newRequestTemplate = Hogan.compile(newRequest);
//   server.use(nextI18NextMiddleware(nextI18next));

//   server.use(bodyParser.urlencoded({ extended: false }));

//   server.use(bodyParser.json());

//   server.use((req, res, next) => {
//     if (req.headers.host.startsWith("www.")) {
//       const newHost = req.headers.host.slice(4);
//       return res.redirect(
//         301,
//         `${req.protocol}://${newHost}${req.originalUrl}`
//       );
//     }
//     next();
//   });

//   server.post("/email", (req, res) => {
//     const { email, language, comment } = req.body;
//     const message = {
//       from: "IBA Cloud bot@mail.icdc.io",
//       to: email,
//       subject: locales[language].subject,
//       html: compiledTemplate.render({
//         email: email,
//         locale: locales[language],
//       }),
//     };
//     const newRequestMessage = {
//       from: "IBA Cloud bot@mail.icdc.io",
//       to: " info@icdc.io",
//       subject: "Новая заявка с сайта ibacloud.by",
//       html: newRequestTemplate.render({
//         email: email,
//         language: language,
//         comment: comment,
//       }),
//     };
//     mailer(message);
//     mailer(newRequestMessage);
//     res.send("ok");
//   });

//   server.post("/signin", (req, res) => {
//     const { email, password } = req.body;
//     const url =
//       "https://login.icdc.io/auth/realms/master/protocol/openid-connect/token";
//     const headers = {
//       "Content-Type": "application/x-www-form-urlencoded",
//     };
//     const form = {
//       username: email,
//       password: password,
//       client_id: "landing",
//       grant_type: "password",
//       client_secret: "f5a50a1c-be22-4195-9f62-84fadeb5b245",
//     };
//     request.post({ url, form, headers }, (error, result) => {
//       if (error) return res.status(500).json({ error });
//       if (result.statusCode !== 200)
//         return res
//           .status(result.statusCode)
//           .json({ message: result.statusMessage });
//       try {
//         User.findOne({ email: email.toLowerCase() }).exec((err, user) => {
//           if (err || !user) {
//             return res.status(400).json({
//               error: "User with that email does not exist. Please signup.",
//             });
//           }
//           const token = jwt.sign(
//             { user: user.email, date: new Date() },
//             process.env.SECRET_KEY
//           );
//           User.updateOne(
//             { email: email.toLowerCase() },
//             { $set: { token: token } },
//             (err, _result) => {
//               if (err) {
//                 return res.status(400).json({ error: err });
//               }
//               res.status(200).json({ token });
//             }
//           );
//         });
//       } catch (e) {
//         return res.status(500).json({
//           error: e,
//         });
//       }
//     });
//   });

//   server.post("/signout", (req, res) => {
//     const bearerHeader = req.headers["authorization"];
//     console.log("signout");
//     if (!bearerHeader) return res.sendStatus(401);

//     const token = bearerHeader.split(" ")[1];
//     User.findOne({ token: token }).exec((err, user) => {
//       if (err) return res.sendStatus(500);
//       user.token = "";
//       user.save((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: err,
//           });
//         }
//         res.json(result);
//       });
//     });
//   });

//   server.post("/create", verifyToken, (req, res) => {
//     const {
//       slug,
//       status,
//       author,
//       enAuthor,
//       image,
//       text,
//       enText,
//       title,
//       enTitle,
//       category,
//       time,
//       views,
//       fixedDate,
//     } = req.body;
//     let blog = new Blog();
//     blog.title = title;
//     blog.enTitle = enTitle;
//     blog.category = category;
//     blog.slug = slug;
//     blog.status = status;
//     blog.author = author;
//     blog.enAuthor = enAuthor;
//     blog.image = image;
//     blog.text = text;
//     blog.enText = enText;
//     blog.time = time;
//     blog.views = views;
//     blog.fixedDate = fixedDate;
//     blog.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       res.json(result);
//     });
//   });

//   server.get("/posts", (_req, res) => {
//     Blog.find({}).exec((err, data) => {
//       if (err) return res.status(400).json({ error });
//       res.json(data);
//     });
//   });

//   server.get("/posts/:id/views", (req, res) => {
//     Blog.findById(req.params.id, (err, data) => {
//       if (err) {
//         return res.status(400).json({ error });
//       } else {
//         Blog.findByIdAndUpdate(
//           req.params.id,
//           { views: +data.views + 1 },
//           function (err, data) {
//             if (err) {
//               return res.status(400).json({ error });
//             } else {
//               console.log("counter of views success");
//               res.json(data);
//             }
//           }
//         );
//       }
//     });
//   });
//   server.delete(`/posts/:id`, verifyToken, (_req, res) => {
//     Blog.findByIdAndRemove(_req.params.id, function (err, data) {
//       if (err) {
//         return res.status(400).json({ error });
//       } else {
//         console.log("success delete");
//         res.json(data);
//       }
//     });
//   });

//   server.put("/posts/:id", verifyToken, (req, res) => {
//     Blog.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
//       if (err) {
//         return res.status(400).json({ error });
//       } else {
//         console.log("update success");
//         res.json(data);
//       }
//     });
//   });

//   server.get("/categories", (_req, res) => {
//     Category.distinct("name").exec((err, data) => {
//       if (err) return res.status(400).json({ error });

//       res.json(data);
//     });
//     // res.json(["devops", "admin", "openshift"]);
//   });

//   server.post("/categories", verifyToken, (req, res) => {
//     const { name } = req.body;
//     let newCategory = new Category();
//     newCategory.name = name;
//     newCategory.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       res.json(result);
//     });
//   });

//   server.put("/categories/:name", verifyToken, (req, res) => {
//     Category.find({ name: req.params.name }, async function (err, data) {
//       if (err) {
//         return res.status(400).json({ error });
//       } else {
//         await Category.updateOne(
//           { name: req.params.name },
//           req.body,
//           function (err, result) {
//             if (err) return res.status(400).json({ error });
//           }
//         );
//         console.log("update category success");
//         res.json(data);
//       }
//     });
//   });

//   server.delete("/categories/:name", verifyToken, (req, res) => {
//     Category.find({ name: req.params.name }, async function (err, data) {
//       if (err) {
//         return res.status(400).json({ error });
//       } else {
//         await Category.deleteOne(
//           { name: req.params.name },
//           function (err, data) {
//             if (err) {
//               return res.status(400).json({ error });
//             } else {
//               console.log("delete category success");
//               res.json(data);
//             }
//           }
//         );
//       }
//     });
//   });

//   server.get("/cookies-policy-en", (req, res) => {
//     res.sendFile(`${__dirname}/docs/cookies-policy-en.html`);
//   });

//   server.get("/privacy-policy-en", (req, res) => {
//     res.sendFile(`${__dirname}/docs/privacy-policy-en.html`);
//   });

//   server.get("/cookies-policy", (req, res) => {
//     res.sendFile(`${__dirname}/docs/cookies-policy-en.html`);
//   });

//   server.get("/privacy-policy", (req, res) => {
//     res.sendFile(`${__dirname}/docs/privacy-policy-en.html`);
//   });

//   server.get("/cookies-policy-ru", (req, res) => {
//     res.sendFile(`${__dirname}/docs/cookies-policy-ru.html`);
//   });

//   server.get("/privacy-policy-ru", (req, res) => {
//     res.sendFile(`${__dirname}/docs/privacy-policy-ru.html`);
//   });

//   server.get("/privacy-policy.css", (req, res) => {
//     res.sendFile(`${__dirname}/docs/privacy-policy.css`);
//   });

//   server.get("/public-contract.pdf", (req, res) => {
//     res.sendFile(`${__dirname}/docs/public-contract.pdf`);
//   });

//   server.get("/service-provision.pdf", (req, res) => {
//     res.sendFile(`${__dirname}/docs/service-provision.pdf`);
//   });

//   server.get("/robots.txt", (req, res) => {
//     res.sendFile(`${__dirname}/docs/robots.txt`);
//   });

//   server.get("/sitemap.xml", (req, res) => {
//     res.sendFile(`${__dirname}/docs/sitemap.xml`);
//   });

//   server.get("*", (req, res) => handle(req, res));

//   await server.listen(port);
// })();
