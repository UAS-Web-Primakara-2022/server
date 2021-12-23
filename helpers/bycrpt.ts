import { hashSync, compareSync } from "bcryptjs";

export const generateHash = (password: string): string => {
  return hashSync(password);
};

export const decodeHash = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
};
