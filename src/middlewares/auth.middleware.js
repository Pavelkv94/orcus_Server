import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ errorsMessages: [{ message: "User unauthorized" }] });
    }

    const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decodedData;
    next();
  } catch (e) {
    return res.status(403).json({ errorsMessages: [{ message: "User not unauthorized" }] });
  }
};
