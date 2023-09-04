import { Request, Response } from "express";
import { Vinyl } from "../../Models/Vinyls";
import { Users } from "../../Models/Users";
import { Sequelize } from "sequelize";
import { 
  DB_NAME,
  DB_USER,
  DB_HOST, 
  DB_PASSWORD
} from "../../../config";

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  dialect: "postgres",
  host: `${DB_HOST}`
} )

const userVinyls = sequelize.model('UserVinyls')


export const deleteVinyl = async (req: Request, res: Response) => {
    try {
        const userId = req.params.UserId;
        const vinylId = req.params.VinylId;

        const user = await Users.findByPk(userId);

        if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Verifica si existe una relación entre el usuario y el vinilo en la tabla intermedia
    const vinylRelation = await userVinyls.findOne({
      where: { 
        UserId : userId,
        VinylsId: vinylId
      },
    });

    if(!vinylRelation) {
      return res.status(401).send('No tienes permiso para eliminar ese vinilo');
    }

    await Vinyl.destroy({
      where: {
        id: vinylId
      }
    })

    

        // const vinylFind = await Vinyl.findOne({
        //     where : {
        //         title
        //     }
        // })
        // if (vinylFind?.idApi !== undefined) {
        //     return res.status(402).send('No puedes eliminar un vinilo ya existente');
        // }
        // if(vinylFind) {
        //     await vinylFind.destroy();
        //     res.status(200).send(`se ha eliminado al vinilo ${title}`)
        // } else {
        //     res.status(400).json({message: 'No se ha encontrado el vinilo para eliminar'})
        // }
    } catch (error) {
        res.status(401).json({message: 'Ha fallado la eliminación del vinilo'})
    }
}

export default deleteVinyl;