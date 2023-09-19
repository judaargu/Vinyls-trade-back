import { Vinyl } from "../../Models/Vinyls";

export const changeVinyls = async (body: any, params: any) => {
  const { stock } = body;
  const { id } = params;

  const vinilo = await Vinyl.findByPk(id);

  if (vinilo) {
    vinilo.stock = stock;
    await vinilo.save();
    return "actualizacion exitosa";
  } else {
    return "Fallo la actualizacion de stock";
  }
};

export const restoreVinyls = async (params: any) => {
  const { id } = params;

  const vinilo = await Vinyl.findOne({
    where: {
      id,
    },
    paranoid: false,
  });
  if (vinilo) {
    vinilo.restore();
    vinilo.stock = 1;
    await vinilo.save();
    return 'Se restauro exitosamente'
  } else {
    return 'fallo la restauracion'
  }
};

export const suspendVinyls = async (params: any) => {
  const { id } = params;

  const vinilo = await Vinyl.findOne({
    where: {
        id,
        stock: 0
    }
  });

  
  if (vinilo) {
    Vinyl.destroy({
      where: {
        id,
      },
    });
    return 'se ha suspendido con exito'
  } else {
    return 'fallo la suspension del vinilo'
  }
};
