import { Router } from "express";
import { upload } from "../middlewares/upload";
import { authentication, adminAuthorization } from "../middlewares/auth";
import TAKControllers from "../controllers/takControllers";

const router = Router();

router.use(authentication);
router.get("/:id", TAKControllers.getDetailTAK);
// "image" is image property from req.body
router.post("/", upload.single("image"), TAKControllers.createTAK);
router.patch("/:id", TAKControllers.updateTAK);
router.delete("/:id", TAKControllers.deleteTAK);

router.use(adminAuthorization);
router.patch("/validate/:id", TAKControllers.validateTAK);
router.get("/", TAKControllers.getAllTAK);

export default router;
