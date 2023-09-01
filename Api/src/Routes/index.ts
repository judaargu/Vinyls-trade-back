import { Router } from "express";
import getAllVinyls from "../Controllers/Vinyls/getVinyls";
import { createUserHandler } from "../Routes/usersRouter";

const router = Router();

router.get("/", getAllVinyls);

router.post("/createUser", createUserHandler);

export default router;
