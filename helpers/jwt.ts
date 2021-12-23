import jwt from "jsonwebtoken";

const secret = process.env.JWTSECRET ?? "123456789secret";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret);
};

export const decodeToken = (token: string): object | string => {
  return jwt.verify(token, secret);
};
