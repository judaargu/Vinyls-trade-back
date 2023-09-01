import { Router } from "express";
import getAllVinyls from "../Controllers/Vinyls/getVinyls";
import { createUserHandler } from "../Routes/usersRouter";
import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import { Request, Response } from "express";

const router = Router();

router.get("/", getAllVinyls);

router.post("/createUser", createUserHandler);

router.post('/', async (req: Request, res: Response) => {
    try {
        const vinyl = await postVinyl(req.body);
        return res.status(vinyl.status).json(vinyl.json);

    } catch (error) {
        return res.status(404).json(error);
        
    }
})

export default router;

export default router;
