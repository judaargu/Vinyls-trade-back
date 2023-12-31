import { Request, Response } from "express";
import { Users } from "../../Models/Users";
import { sequelize } from "../../db";

const inhabilityDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const userFind = await Users.update(
      {isDeleted: true},
      {
        where: {
          id
        }
      }
    )
    if (userFind) {
      // const users = {
      //   id: userFind.id,
      //   name: userFind.name
      // }
      // await Users.destroy({
      //   where: {
      //     id,
      //   },
      // });
      res.status(200).json(userFind);
    } else {
      res
        .status(400)
        .json({ message: "No se ha encontrado el usuario para eliminar" });
    }
  } catch (error) {
    res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userFind = await Users.findOne({
      where: {
        id,
      },
      paranoid: false,
    });

    if (userFind) {
      userFind.restore();
      await Users.destroy({
        where: {
          id,
        },
        force: true,
      });
      res.status(200).send(`se ha eliminado al usuario ${id}`);
    } else {
      res
        .status(400)
        .json({ message: "No se ha encontrado el usuario para eliminar" });
    }
  } catch (error) {
    res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
  }
};

const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const userFind = await Users.update(
      { isDeleted: false }, // Valores que deseas actualizar
      {
        where: {
          id, // Condición para seleccionar el usuario específico por su ID
        },
      }
    )
    if (userFind) {
      // await userFind.restore();
      // await Users.findOne({
      //   where:{
      //     id,
      //     isDeleted: false
      //   }
      // })
      res.status(200).send(`se ha restaurado al usuario ${id}`);
    } else {
      res
        .status(400)
        .json({ message: "No se ha encontrado el usuario para restaurar" });
    }
  } catch (error) {
    res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
  }
};

// ! Sólo usar cuando se quiera eliminar a todos los usuarios de la base de datos

const deleteAllUsers = async () => {
  try {
    await Users.destroy({
      where: {
        isAdmin: false,
      },
    });

    return {
      status: 200,
      data: "Todos los usuarios han sido eliminados correctamente.",
    };
  } catch (error) {
    return { status: 500, data: "Error al eliminar los usuarios:", error };
  }
};

export { deleteUser, deleteAllUsers, restoreUser, inhabilityDeleteUser };
// export default deleteUser;
