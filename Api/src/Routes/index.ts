import { Router } from "express";
import {getAllVinyls, postVinylsController} from "../Controllers/Vinyls/getVinyls";

import { createUserHandler } from "../Routes/usersRouter";


const router = Router();

router.get('/', getAllVinyls);
router.post("/createUser", createUserHandler);
router.post("/vinyls", postVinylsController)
export default router;
