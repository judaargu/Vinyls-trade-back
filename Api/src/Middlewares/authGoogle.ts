import { NextFunction, Request, Response } from "express";
import admin from "../ConfigGoogleAuth/firebase-config";

const decodeToken =async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token: any = req.headers.authorization?.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(token);
        
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        }

        return res.json({message: "Sin permiso"});

    } catch (error) {
        return res.json({message: "Error en el servidor"});
    }

};

export default decodeToken;