import jwt from "jsonwebtoken";
import { TokenData } from "../interface/CustomInterface";

const secret = process.env.JWTSECRET ?? "123456789secret";

export const generateToken = (payload: TokenData): string => {
  return jwt.sign(payload, secret);
};

export const decodeToken = (token: string): object | string => {
  return jwt.verify(token, secret);
};
