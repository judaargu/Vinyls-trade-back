import { Router } from "express";
import {getAllVinyls, postVinylsController, getVinylById} from "../Controllers/Vinyls/getVinyls";

import { createUserHandler } from "../Routes/usersRouter";

import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import { Request, Response } from "express";

const router = Router();

router.get('/', getAllVinyls);

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const vinyl = await getVinylById(req.params);
        return res.status(vinyl.status).json(vinyl.json);

    } catch (error) {
        return res.status(404).json(error);
        
    }
});
router.post("/createUser", createUserHandler);

router.post('/', async (req: Request, res: Response) => {
    try {
        const vinyl = await postVinyl(req.body);
        return res.status(vinyl.status).json(vinyl.json);

    } catch (error) {
        return res.status(404).json(error);
        
    }
})

router.post("/vinyls", postVinylsController)
export default router;
