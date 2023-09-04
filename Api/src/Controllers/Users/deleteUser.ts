import { Request, Response } from "express";
import { Users } from "../../Models/Users";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;


        const userFind = await Users.findOne({
            where : {
                name
            }
        })
        if(userFind) {
            await Users.destroy({
                where: {
                    name,
                }
            });
            res.status(200).send(`se ha eliminado al usuario ${name}`)
        } else {
            res.status(400).json({message: 'No se ha encontrado el usuario para eliminar'})
        }
    } catch (error) {
        res.status(401).json({message: 'Ha fallado la eliminación del usuario'})
    }
}

export default deleteUser;