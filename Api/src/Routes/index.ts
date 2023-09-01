import { Router } from "express";
import {getAllVinyls, postVinylsController} from "../Controllers/Vinyls/getVinyls";

const router = Router();

router.get('/', getAllVinyls);
router.post("/vinyls", postVinylsController)
export default router;