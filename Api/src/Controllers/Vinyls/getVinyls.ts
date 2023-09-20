import axios from 'axios';
import { Request, Response } from 'express';
import { Vinyl } from '../../Models/Vinyls';
import { Users } from '../../Models/Users';
import {Model} from "sequelize"
const postVinylsController = async (req: Request, res: Response) => {
    const userId: string = "5a6ec8f4-1e04-49c1-862a-bb35f1197e10"
    try {
        // Busca al usuario por su userId
        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const allVinyls = await Vinyl.findAll(); 

        // Asocia todos los vinilos al usuario
        // await user.addVinyls(allVinyls);
        res.status(200).json({ message: 'All vinyls associated with the user.' });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
}
const getVinylsController = async (): Promise<any[]> => {
    const findVinyls = await Vinyl.findAll({
        include: [
            {
                model: Users,
                as: 'Users',
                through: {
                    attributes: ['createdAt', 'UserId', 'VinylId']
                }
            }
        ]
    });

    // Mapear y limpiar la respuesta
    const cleanedVinyls = findVinyls.map((vinyl: Model) => {
        const { Users } = vinyl as any;
        if (Users && Users.length > 0) {
            return {
                ...(vinyl.toJSON() as any),
                Users: Users.map((user: Model) => ({
                    UserVinyls: user.UserVinyls
                }))
            };
        } else {
            return vinyl.toJSON() as any;
        }
    });

    return cleanedVinyls;
}


const getAllVinyls = async (req: Request, res: Response) => {
    try {
        const response = await getVinylsController();
        // fs.writeFileSync('data.json', JSON.stringify(response, null, 2));
        return res.status(200).json(response) 
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
    }
}
const getVinylById = async (param: any) => {
    const { id } = param;

    try {
        let vinyl = await Vinyl.findAll({where: {id}});

        return {status: 200, json: vinyl};
        
    } catch (error) {
        return {status: 500, json: 'El vinilo no existe'};
    }
}

export { getAllVinyls, postVinylsController, getVinylById, getVinylsController};