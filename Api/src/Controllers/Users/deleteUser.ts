import { Request, Response } from "express";
import { Users } from "../../Models/Users";

const deleteUser = async (req: Request, res: Response) => {
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

// ! Sólo usar cuando se quiera eliminar a todos los usuarios de la base de datos

const deleteAllUsers = async () => {

    try {
        await Users.destroy({
        where: {
            isAdmin: false,
        },
        });
    
        return {status: 200, data: 'Todos los usuarios han sido eliminados correctamente.'};
    } catch (error) {
        return {status: 500, data: 'Error al eliminar los usuarios:', error};
    }
}

export {deleteUser, deleteAllUsers};
// export default deleteUser;