import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

interface Error {
  status?: number;
  message?: {
    message: string;
    name: string;
  };
  errors: any;
  name?: string;
}

const errorHandling = (
  err: any | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("masuk error");
  console.log(err);
  let key: any;

  // Default error message and status code
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    const errors = [];
    for (key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(400).json({ message: "validation error", errors });
  } else if (err.message?.name === "JsonWebTokenError") {
    res.status(status).json({ message: err.message.message });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({ code: err.code, meta: err.meta });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res
      .status(400)
      .json({ message: "Missing field or incorrect field type provided" });
  } else {
    res.status(status).json({ message });
  }
};

export default errorHandling;
