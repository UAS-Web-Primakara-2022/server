import { Request } from "express";

export interface TokenData {
  nidn?: number;
  nim?: number;
  name: string;
  email: string;
  role: "admin" | "mahasiswa";
}

export interface IRequest extends Request {
  multerS3?: Express.MulterS3.File;
  loggedUser?: TokenData;
}
