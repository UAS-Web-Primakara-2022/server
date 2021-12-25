import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import adminRouter from "./adminRouter";
import mahasiswaRouter from "./mahasiswaRouter";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Server Connected" });
});

router.use("/admin", adminRouter);
router.use("/mahasiswa", mahasiswaRouter);

export default router;
