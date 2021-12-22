import { Router } from "express";
import AdminController from "../controllers/adminControllers";

const router = Router();

router.get("/", AdminController.getAllUser);
// router.post("/login", userController.login);
// router.post("/register", userController.register);

export default router;
