import jwt from "jsonwebtoken";

const secret = process.env.JWTSECRET || "123456";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret);
};

export const decodeToken = (token: any): object | string => {
  return jwt.verify(token, secret);
};
