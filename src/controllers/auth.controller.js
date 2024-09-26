import { ObjectId } from "mongodb";
import { usersCollection } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//создаем функцию которая принимает ИД и роль и засовываем эт овсе в обьект пайлоад
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "12h" }); //передаем обьект, секретный ключ который храниться на сервере и опции
};

// class authController {
//   async registration(req, res) {
//     try {
//       //валидация
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ message: "Ошибка при регистрации", errors });
//       }

//       const { username, password } = req.body;
//       const candidate = await User.findOne({ username }); //ищем пользователя с этим юзернеймом
//       if (candidate) {
//         return res.status(400).json({ message: "Пользователь уже существует" });
//       }

//       var hashPassword = bcrypt.hashSync(password, 7); //Хэшируем пароль

//       const userRole = await Role.findOne({ value: "user" }); //присваиваем роль Юзера

//       const user = new User({
//         username,
//         password: hashPassword,
//         roles: [userRole.value],
//       }); //создаем пользователя

//       await user.save(); //сохраняем в БД

//       return res.json({ message: "Пользователь зарегестрирован" }); //мессадж
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Registration Error" });
//     }
//   }

//   async login(req, res) {
//     try {
//       const { username, password } = req.body; //получаем данные

//       const user = await User.findOne({ username }); // ищем юзера
//       if (!user) {
//         return res.status(400).json({ message: "Пользователь не найден" });
//       }

//       const validPassword = bcrypt.compareSync(password, user.password); //валидация введенного пароля
//       if (!validPassword) {
//         return res.status(400).json({ message: "Пароль не верный" });
//       }

//       const token = generateAccessToken(user._id, user.roles); // _id монго генерирует сам
//       return res.json({ username: user.username, role: user.roles, id: user._id, token });
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Login Error" });
//     }
//   }

//   async me(req, res) {
//     try {
//       const { user } = req.params;

//       const userData = await User.findOne({ username: user });
//       return res.status(200).json({ username: userData.username, role: userData.roles[0] });
//     } catch (e) {
//       return res.status(403).json({ message: "You are not autorized" });
//     }
//   }

//   async getUsers(req, res) {
//     try {
//       const users = await User.find(); //получаем юзеров
//       res.json(users);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }

export const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await usersCollection.findOne({ username: username });

      if (!user) {
        res.status(400).json({ errorsMessages: [{ message: "User not found" }] });
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        res.status(400).json({ errorsMessages: [{ message: "Password incorrect" }] });
        return;
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ username: user.username, role: user.roles, id: user._id, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorsMessages: [{ message: "Login Error" }] });
    }
  },

  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await usersCollection.findOne({ username });

      if (candidate) {
        res.status(400).json({ errorsMessages: [{ message: "User already exist" }] });
        return;
      }

      var hashPassword = bcrypt.hashSync(password, 7);

      // const userRole = await Role.findOne({ value: "user" }); //присваиваем роль Юзера

      const id = new ObjectId();

      const newUser = {
        _id: id,
        id: id.toString(),
        username,
        password: hashPassword,
        roles: ["User"],
      };

      await usersCollection.insertOne(newUser);

      return res.status(201).json({ message: "User Registered!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ errorsMessages: [{ message: "Registration Error" }] });
    }
  },
};
