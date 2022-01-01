import { Router } from "express";
import TAKControllers from "../controllers/takControllers";
import { upload } from "../middlewares/upload";

const router = Router();
router.get("/", TAKControllers.getAllTAK);
router.get("/:id", TAKControllers.getDetailTAK);
// "image" is image property from req.body
router.post("/", upload.single("image"), TAKControllers.createTAK);
router.patch("/:id", TAKControllers.updateTAK);
router.patch("/validate/:id", TAKControllers.validateTAK);
router.delete("/:id", TAKControllers.deleteTAK);

export default router;
