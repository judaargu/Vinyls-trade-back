import { Router } from "express";
import getAllVinyls from "../Controllers/Vinyls/getVinyls";

const router = Router();

router.get('/', getAllVinyls);

export default router;