import axios from 'axios';
import { Request, Response } from 'express';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const {TOKEN} = process.env;
const URL = `https://api.discogs.com/`


const getAllVinyls = async (req: Request, res: Response) => {
    try {
        const {data} = await axios.get(`${URL}database/search?format=Vinyl&token=${TOKEN}`)
        fs.writeFileSync('response.json', JSON.stringify(data, null, 2));
        console.log(data)
        return res.status(200).json({ message: 'Respuesta guardada como data.json' });
        // return res.status(200).send(data);
      
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Malio sal :('})
    }

}

export default getAllVinyls;