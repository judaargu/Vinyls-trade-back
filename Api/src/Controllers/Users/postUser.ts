import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Users } from "../../Models/Users";

const secretKey = crypto.randomBytes(32).toString("hex");

interface CreateUserResponse {
  status: number;
  data: any;
}

export const createUser = async (userData: {
  name: string;
  email: string;
  password?: string;
  codArea?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  isAdmin: boolean;
}): Promise<CreateUserResponse> => {
  try {
    const {
      name,
      email,
      password,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    } = userData;

    const userFound = await Users.findOne({ where: { email } });
    if (userFound) {
      return {
        status: 200,
        data: { message: "El correo electrónico ya está registrado" },
      };
    }

  // ! Si el usuario re registra con google no viene con toda la información
    if (!password) {
      const newUser = await Users.create({
        name,
        email,
        isAdmin,
      });

      const token = jwt.sign({ userId: newUser.id }, secretKey, {
        expiresIn: "1h",
      });

      return {
        status: 201,
        data: { ...newUser.toJSON(), token },
      };
    }

    const securityLevel = 10;
    const encryptedPassword = await bcrypt.hash(password, securityLevel);

    const newUser = await Users.create({
      name,
      email,
      password: encryptedPassword,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    });

    const token = jwt.sign({ userId: newUser.id }, secretKey, {
      expiresIn: "1h",
    });

    return {
      status: 201,
      data: { ...newUser.toJSON(), token },
    };
  } catch (error) {
    console.error("Ha ocurrido un error al crear el usuario:", error);
    return {
      status: 500,
      data: { message: "Error interno del servidor" },
    };
  }
};

interface LoginResponse {
  status: number;
  data: any;
}

export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const { email, password } = loginData;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return {
        status: 401,
        data: { message: "Credenciales incorrectas" },
      };
    }

    if (user.password === undefined) {
      return {
        status: 500,
        data: { message: "Error interno del servidor" },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        data: { message: "Credenciales incorrectas" },
      };
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    return {
      status: 200,
      data: { message: "Inicio de sesión exitoso", token },
    };
  } catch (error) {
    console.error("Ha ocurrido un error al iniciar sesión:", error);
    return {
      status: 500,
      data: { message: "Error interno del servidor" },
    };
  }
};

export default { createUser, loginUser };
