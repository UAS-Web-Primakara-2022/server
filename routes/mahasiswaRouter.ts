import { Router } from "express";
import MahasiswaController from "../controllers/mahasiswaControllers";

const router = Router();

router.get("/", MahasiswaController.getAllMahasiswa);
router.post("/register", MahasiswaController.registerMahasiswa);
router.post("/login", MahasiswaController.loginMahasiswa);
// router.patch("/pass/:nim", MahasiswaController.updateMahasiwaPassword);
// router.patch("/:nim", MahasiswaController.updateMahasiswa);
router.delete("/:nim", MahasiswaController.deleteMahasiswa);

export default router;
