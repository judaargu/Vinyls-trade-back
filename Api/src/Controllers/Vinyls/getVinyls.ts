import axios from 'axios';
import { Request, Response } from 'express';
import {cleanData, cleanJson} from '../../utils/cleanData';
import { Vinyl } from '../../Models/Vinyls';


const postVinylsController = async (req: Request, res: Response) => {
    try {
        const {data} = await axios("http://localhost:3001/data.json")
        const postVinyls = await Promise.all(data.data.map(async (vinyl: {}) => {
            const createdVinyl = await Vinyl.create(vinyl)
        }))
        return res.status(200).json({message: "Post successfully"})
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
    }
}
const getVinylsController = async () => {
    const findVinyl = await Vinyl.findAll()
    return findVinyl;
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

export { getAllVinyls, postVinylsController};