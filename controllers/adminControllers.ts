import { Request, Response, NextFunction } from "express";
import { generateHash } from "../helpers/bycrpt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AdminController {
  static async getAllAdmin(req: Request, res: Response) {
    const users = await prisma.admin.findMany();
    res.status(200).json(users);
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { nidn, name, email, password } = req.body;

      const hashPass = generateHash(password);

      const user = await prisma.admin.create({
        data: {
          nidn,
          name,
          email,
          password: hashPass,
        },
      });

      res.status(200).json({
        message: `Admin ${user.name} registered successfully!`,
      });
    } catch (err) {
      next(err);
    }
  }
}
