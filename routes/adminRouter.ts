import { Router } from "express";
import AdminController from "../controllers/adminControllers";

const router = Router();

router.get("/", AdminController.getAllAdmin);
router.post("/register", AdminController.register);
// router.post("/login", userController.login);

export default router;
