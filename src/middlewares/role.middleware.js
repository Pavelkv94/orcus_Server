import jwt from "jsonwebtoken";

export function rolesMiddleware(roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ errorsMessages: [{ message: "User unauthorized" }] });
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          //проверяем содержит ли массив ролей нужную у юзера
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ errorsMessages: [{ message: "Access Forbidden" }] });
      }
      next();
    } catch (e) {
      return res.status(403).json({ errorsMessages: [{ message: "User unauthorized" }] });
    }
  };
}
