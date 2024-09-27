import { ObjectId } from "mongodb";
import { rolesCollection, usersCollection } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "12h" }); //передаем обьект, секретный ключ который храниться на сервере и опции
};

export const authController = {
  async login(req, res) {
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
  },

  async registration(req, res) {
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
  },

  async addRole(req, res) {
    const role = await rolesCollection.findOne({ title: req.query.role });

    if (role) {
      res.status(400).json({ errorsMessages: [{ message: "Role already exist" }] });
      return;
    }

    const newRole = {
      title: req.query.role,
    };

    await rolesCollection.insertOne(newRole);

    return res.status(201).json({ message: "Role Registered!" });
  },

  async getUsers(req, res) {
    const users = await usersCollection.find({}).toArray();
    return res.status(200).send(users);
  },
  async getUser(req, res) {
    const user = await usersCollection.findOne({ username: req.params.username }, { projection: { password: 0, _id: 0 } });
    return res.status(200).send(user);
  },
};
