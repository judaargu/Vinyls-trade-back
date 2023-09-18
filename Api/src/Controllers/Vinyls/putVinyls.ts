import { Vinyl } from "../../Models/Vinyls";

export const changeVinyls = async (body: any, params: any) => {

    const {units} = body;
    const {id} = params; 

    const vinilo = await Vinyl.findByPk(id);
    

    if(vinilo) {
        vinilo.stock = vinilo.stock - units;
        await vinilo.save();
        return 'actualizacion exitosa'
    } else {
        return 'Fallo la actualizacion de stock'
    }


}

export const restoreVinyls = async(params: any) => {
    const {id} = params

    const vinilo = await Vinyl.findByPk(id)

    if(vinilo) {
        Vinyl.restore({
            where: {
                id,
                stock: 1
            }
        })
    }
}

export const suspendVinyls = async (params: any) => {
    const {id} = params

    const vinilo = await Vinyl.findByPk(id)

    if(vinilo && vinilo.stock <= 0 ) {
        Vinyl.destroy({
            where: {
                id
            }
        })
    }
}

