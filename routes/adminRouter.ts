import { Router } from "express";
import AdminController from "../controllers/adminControllers";

const router = Router();

router.get("/", AdminController.getAllAdmin);
router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.loginAdmin);
router.patch("/pass/:nidn", AdminController.updateAdminPassword);
router.patch("/:nidn", AdminController.updateAdmin);
router.delete("/:nidn", AdminController.deleteAdmin);

export default router;
