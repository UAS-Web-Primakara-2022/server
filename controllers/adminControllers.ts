import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AdminController {
  static async getAllUser(req: Request, res: Response) {
    const users = await prisma.admin.findMany();
    res.status(200).json(users);
  }
}
