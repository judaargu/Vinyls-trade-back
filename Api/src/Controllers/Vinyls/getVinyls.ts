import axios from 'axios';
import { Request, Response } from 'express';
import * as fs from 'fs';
import {
    TOKEN,
    URL
} from "../../../config"


const getAllVinyls = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${URL}database/search?format=Vinyl&token=${TOKEN}&page=100&per_page=100`)
        fs.writeFileSync('response.json', JSON.stringify(data, null, 2));
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Malio sal :(' })
    }

}

export default getAllVinyls;