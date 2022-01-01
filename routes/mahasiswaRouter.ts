import { Router } from "express";
import { authentication, adminAuthorization } from "../middlewares/auth";
import MahasiswaController from "../controllers/mahasiswaControllers";

const router = Router();

router.post("/login", MahasiswaController.loginMahasiswa);

router.use(authentication);
router.get("/:nim", MahasiswaController.getDetailMahasiswa);

router.use(adminAuthorization);
router.get("/", MahasiswaController.getAllMahasiswa);
router.post("/register", MahasiswaController.registerMahasiswa);
router.delete("/:nim", MahasiswaController.deleteMahasiswa);

// router.patch("/pass/:nim", MahasiswaController.updateMahasiwaPassword);
// router.patch("/:nim", MahasiswaController.updateMahasiswa);

export default router;
