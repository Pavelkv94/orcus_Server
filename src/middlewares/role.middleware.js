import jwt from "jsonwebtoken";

export function rolesMiddleware(roles) {
  return async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
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
  };
}
