import nodemailer from "nodemailer";
import { Order } from "../../Models/Order";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "vinylstrade@gmail.com",
        pass: "gkelbsstqgblbimv"
    }
});

export async function enviarNotificacionDeCompra(
    destinatario: string,
    nombreVinilo: string,
    precio: number
) {

    try {
        const info = await transporter.sendMail({
            from: '"Vinyls-Trade 📀" <vinylstrade@gmail.com>',
            to: destinatario,
            subject: "Confirmación de compra",
            html: `
                <p>¡Muchas gracias por tu compra!</p>
                <p>Vinilo: ${nombreVinilo}</p>
                <p>Precio: ${precio}</p>
            `,
        });

        console.log("Correo electrónico enviado con éxito:", info.response);
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
    }
}

