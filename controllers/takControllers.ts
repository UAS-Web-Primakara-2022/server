import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class TAKControllers {
  static async getAllTAK(req: Request, res: Response) {
    const tak = await prisma.tak.findMany();
    res.status(200).json(tak);
  }

  static async getDetailTAK(req: Request, res: Response) {
    const tak = await prisma.tak.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(tak);
  }

  static async createTAK(req: Request, res: Response, next: NextFunction) {
    try {
      const { nim, name, tingkatan } = req.body;

      const mahasiswa = await prisma.mahasiswa.findUnique({
        where: { nim },
      });

      if (mahasiswa?.nim) {
        const tak = await prisma.tak.create({
          data: {
            name,
            mahasiswaNIM: nim,
            image:
              "https://balitbangda.kukarkab.go.id/wp-content/uploads/2020/12/sertifikat-IDSD_1017x768.jpg",
            tingkatan,
          },
        });

        if (tak) res.status(201).json({ message: "TAK created successfully!" });
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

  static async updateTAK(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, tingkatan } = req.body;
      const { id } = req.params;

      const tak = await prisma.tak.update({
        where: { id },
        data: {
          name,
          tingkatan,
        },
      });

      if (tak) {
        res.status(201).json({ message: "Update TAK created successfully!" });
      }
    } catch (err) {
      next(err);
    }
  }
}
