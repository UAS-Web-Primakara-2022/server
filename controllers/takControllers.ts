import { Request, Response, NextFunction } from "express";
import { PrismaClient, Tak } from "@prisma/client";
import { s3 } from "../config/awsSDKS3";
import { IRequest } from "../interface/CustomInterface";
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

  static async createTAK(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { nim, name, tingkatan } = req.body;

      const mahasiswa = await prisma.mahasiswa.findUnique({
        where: { nim: Number(nim) },
      });

      if (!req.file) throw { status: 500, message: "File missing" };

      // Get multer-s3's type definitions
      // https://stackoverflow.com/questions/65811416/how-to-use-multer-s3s-type-definition-for-req-file-rather-than-multers
      req.multerS3 = req.file as Express.MulterS3.File;

      if (mahasiswa?.nim) {
        const tak = await prisma.tak.create({
          data: {
            name,
            mahasiswaNIM: Number(nim),
            image: req.multerS3.location,
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
        // Delete image from S3
        s3.deleteObject({
          Bucket: process.env.AWS_BUCKET ?? "",
          Key: TAKControllers.getImageNameS3(takFound),
        });

        // Delete TAK from database
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

  private static getImageNameS3(tak: Tak | null): string {
    if (tak) {
      const datas = tak?.image?.split("amazonaws.com/");
      const fileKey = datas?.pop() ?? "";
      return fileKey;
    } else {
      throw new Error("Something went wrong");
    }
  }
}
