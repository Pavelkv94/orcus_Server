import { validationResult } from "express-validator";

export const inputCheckErrorsMiddleware = (req, res, next) => {
  const e = validationResult(req);

  if (!e.isEmpty()) {
    const eArray = e.array({ onlyFirstError: true });

    res.status(400).json({
      errorsMessages: eArray.map((x) => ({ field: x.path, message: x.msg })),
    });
    return;
  }

  next();
};
