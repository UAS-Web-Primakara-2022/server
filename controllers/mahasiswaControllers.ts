import { Request, Response, NextFunction } from "express";
import { generateHash, decodeHash } from "../helpers/bycrpt";
import { generateToken } from "../helpers/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class MahasiswaController {
  static async getAllMahasiswa(req: Request, res: Response) {
    const mahasiswa = await prisma.mahasiswa.findMany({
      select: {
        nim: true,
        name: true,
        email: true,
        angkatan: true,
        gender: true,
        tak: {
          select: {
            id: true,
          },
        },
      },
    });
    res.status(200).json(mahasiswa);
  }

  static async getDetailMahasiswa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nim } = req.params;

      const mahasiswa = await prisma.mahasiswa.findUnique({
        where: {
          nim: Number(nim),
        },
        select: {
          nim: true,
          name: true,
          email: true,
          angkatan: true,
          gender: true,
          tak: true,
        },
      });
      if (mahasiswa) res.status(200).json(mahasiswa);
    } catch (err) {
      next(err);
    }
  }

  static async registerMahasiswa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nim, name, email, password } = req.body;

      const hashPass = generateHash(password);

      const mahasiswa = await prisma.mahasiswa.create({
        data: {
          nim,
          name,
          email,
          password: hashPass,
        },
      });

      res.status(201).json({
        message: `Mahasiswa ${mahasiswa.name} registered successfully!`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginMahasiswa(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const mahasiswaFound = await prisma.mahasiswa.findUnique({
        where: { email },
      });

      if (mahasiswaFound) {
        if (decodeHash(password, mahasiswaFound.password)) {
          res.status(200).json({
            message: `Mahasiswa ${mahasiswaFound.name} logged in successfully!`,
            role: "mahasiswa",
            token: generateToken({
              nidn: mahasiswaFound.nim,
              name: mahasiswaFound.name,
              email: mahasiswaFound.email,
              role: "mahasiswa",
            }),
          });
        } else {
          res.status(401).json({ message: "Invalid email or password!" });
        }
      } else {
        throw {
          status: 404,
          message:
            "Mahasiswa not registered, please contact PPTI for more information",
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteMahasiswa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nim } = req.params;
      const deleteAdmin = await prisma.mahasiswa.delete({
        where: { nim: Number(nim) },
      });
      if (deleteAdmin) {
        res.status(200).json({
          message: `Mahasiswa ${deleteAdmin.name} deleted successfully!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
