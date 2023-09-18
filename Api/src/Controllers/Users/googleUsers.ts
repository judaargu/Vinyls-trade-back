import { Users } from "../../Models/Users";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const secretKey = crypto.randomBytes(32).toString("hex");

const loginGoogle = async (body: Users) => {
  const { name, email, isAdmin } = body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
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

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    return {
      status: 200,
      data: { message: "Inicio de sesión exitoso", token },
    };
  } catch (error) {
    return { status: 500, data: "Error interno" };
  }
};

export default loginGoogle;
