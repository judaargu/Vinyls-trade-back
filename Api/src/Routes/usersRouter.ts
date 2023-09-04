import { Request, Response } from "express";
import {createUser} from "../Controllers/Users/postUser";

export const createUserHandler = async (req: Request, res: Response) => {
    const userData = req.body;

    const result = await createUser(userData);

    return res.status(result.status).json(result.data);
};

