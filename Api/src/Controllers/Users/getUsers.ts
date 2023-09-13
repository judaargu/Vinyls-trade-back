import { Users } from "../../Models/Users";

const getUsers = async () => {
    const findUsers = await Users.findAll({where: {isAdmin: false}});

    if (findUsers){
        return {status: 200, json: findUsers};

    } else {
        return {status: 404, json: "No se encontraron usuarios registrados"};
    }
};

const getAdmins = async () => {
    const findAdmins = await Users.findAll({where: {isAdmin: true}});

    if (findAdmins){
        return {status: 200, json: findAdmins};

    } else {
        return {status: 404, json: "No se encontraron usuarios registrados"};
    }
};

export {
    getUsers,
    getAdmins,
}