import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class TAKControllers {
  static async getAllTAK(req: Request, res: Response) {
    const { status } = req.query;

    const tak = await prisma.tak.findMany({
      where: {
        verifed_status: status === "true" ? true : false,
      },
    });
    res.status(200).json(tak);
  }

  static async getDetailTAK(req: Request, res: Response, next: NextFunction) {
    try {
      const tak = await prisma.tak.findUnique({
        where: { id: req.params.id },
      });

      if (tak) {
        res.status(200).json(tak);
      } else {
        throw { status: 404, message: `TAK not found` };
      }
    } catch (err) {
      next(err);
    }
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
        res.status(200).json({ message: "Update TAK created successfully!" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async validateTAK(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, tingkatan, pointTak, status } = req.body;
      const { id } = req.params;

      const tak = await prisma.tak.update({
        where: { id },
        data: {
          name,
          tingkatan,
          point_TAK: pointTak,
          verifed_status: status,
        },
      });
      if (tak) res.status(200).json({ message: "TAK validated!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTAK(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const takFound = await prisma.tak.findUnique({
        where: { id },
      });

      if (!takFound?.verifed_status) {
        const tak = await prisma.tak.delete({
          where: { id },
        });
        if (tak) res.status(200).json({ message: `TAK deleted successfully!` });
      } else if (takFound?.verifed_status) {
        throw { status: 400, message: `Cannot delete validated TAK` };
      }
    } catch (err) {
      next(err);
    }
  }
}
