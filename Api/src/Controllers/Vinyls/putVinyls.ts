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
        return 'no se ha encontrado el vinilo correspondiente'
    }

}

