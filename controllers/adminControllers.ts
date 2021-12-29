import { Request, Response, NextFunction } from "express";
import { generateHash, decodeHash } from "../helpers/bycrpt";
import { generateToken } from "../helpers/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface AdminToken {
  nidn: number;
  name: string;
  email: string;
  role: "admin";
}
export default class AdminController {
  static async getAllAdmin(req: Request, res: Response) {
    const admin = await prisma.admin.findMany({
      select: { nidn: true, name: true, email: true },
    });
    res.status(200).json(admin);
  }

  static async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { nidn, name, email, password } = req.body;

      const hashPass = generateHash(password);

      const admin = await prisma.admin.create({
        data: {
          nidn,
          name,
          email,
          password: hashPass,
        },
      });

      res.status(201).json({
        message: `Admin ${admin.name} registered successfully!`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const adminFound = await prisma.admin.findUnique({
        where: { email },
      });

      if (adminFound) {
        if (decodeHash(password, adminFound.password)) {
          const dataAdminToken: AdminToken = {
            nidn: adminFound.nidn,
            name: adminFound.name,
            email: adminFound.email,
            role: "admin",
          };

          res.status(200).json({
            message: `Admin ${adminFound.name} logged in successfully!`,
            role: "admin",
            token: generateToken(dataAdminToken),
          });
        } else {
          res.status(401).json({ message: "Invalid email or password!" });
        }
      } else {
        throw { status: 404, message: "Admin not registered" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      const { nidn } = req.params;

      const updateAdmin = await prisma.admin.update({
        where: { nidn: Number(nidn) },
        data: {
          name,
          email,
        },
      });
      if (updateAdmin) {
        res.status(200).json({
          message: `Admin ${updateAdmin.name} updated successfully!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateAdminPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password } = req.body;
      const { nidn } = req.params;

      const hashPass = generateHash(password);

      const updateAdmin = await prisma.admin.update({
        where: { nidn: Number(nidn) },
        data: {
          password: hashPass,
        },
      });
      if (updateAdmin) {
        res.status(200).json({
          message: `Admin ${updateAdmin.name} password updated successfully!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { nidn } = req.params;
      const deleteAdmin = await prisma.admin.delete({
        where: { nidn: Number(nidn) },
      });
      if (deleteAdmin) {
        res.status(200).json({
          message: `Admin ${deleteAdmin.name} deleted successfully!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
