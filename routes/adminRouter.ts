import { Router } from "express";
import { authentication, adminAuthorization } from "../middlewares/auth";
import AdminController from "../controllers/adminControllers";

const router = Router();

router.post("/login", AdminController.loginAdmin);

router.use(authentication);
router.use(adminAuthorization);
router.get("/", AdminController.getAllAdmin);
router.post("/register", AdminController.registerAdmin);
router.patch("/pass/:nidn", AdminController.updateAdminPassword);
router.patch("/:nidn", AdminController.updateAdmin);
router.delete("/:nidn", AdminController.deleteAdmin);

export default router;
