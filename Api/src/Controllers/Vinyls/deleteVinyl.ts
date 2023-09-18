import { Request, Response } from "express";
import { Vinyl } from "../../Models/Vinyls";
import { Users }  from "../../Models/Users";
import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } from "../../../config";

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  dialect: "postgres",
  host: `${DB_HOST}`,
});

const userVinyls = sequelize.model("UserVinyls");

export const deleteVinyl = async (req: Request, res: Response) => {
  try {
    const userId = req.params.UserId;
    const vinylId = req.params.VinylId;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const vinylRelation = await userVinyls.findOne({
      where: {
        UserId: userId,
        VinylsId: vinylId,
      },
    });

    if (!vinylRelation) {
      return res.status(401).send("No tienes permiso para eliminar ese vinilo");
    }

    await Vinyl.destroy({
      where: {
        id: vinylId,
      },
    });

  } catch (error) {
    res.status(401).json({ message: "Ha fallado la eliminación del vinilo" });
  }
};

export default deleteVinyl;
