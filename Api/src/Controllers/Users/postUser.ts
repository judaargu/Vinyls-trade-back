import bcrypt from 'bcrypt';
import { Users } from '../../Models/Users';

interface CreateUserResponse {
    status: number;
    data: any;
}

export const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
}): Promise<CreateUserResponse> => {
    try {
        const { name, email, password } = userData;

        const userFound = await Users.findOne({ where: { email } });
        if (userFound) {
            return {
                status: 400,
                data: { message: 'El correo electrónico ya está registrado' },
            };
        }

        const securityLevel = 10;
        const encryptedPassword = await bcrypt.hash(password, securityLevel);

        const newUser = await Users.create({
            name,
            email,
            password: encryptedPassword,
        });

        return {
            status: 201,
            data: newUser,
        };
    } catch (error) {
        console.error('Ha ocurrido un error al crear el usuario:', error);
        return {
            status: 500,
            data: { message: 'Error interno del servidor' },
        };
    }
};

export default createUser;

