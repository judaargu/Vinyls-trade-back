"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarNotificacionDeCompra = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "vinylstrade@gmail.com",
        pass: "gkelbsstqgblbimv",
    },
});
function enviarNotificacionDeCompra(destinatario, detail, precio) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(destinatario, detail, precio);
        try {
            const info = yield exports.transporter.sendMail({
                from: '"Vinyls-Trade 📀" <vinylstrade@gmail.com>',
                to: 'vinylstrade@gmail.com',
                subject: "Confirmación de compra",
                html: `
                <p>¡Muchas gracias por tu compra!</p>
                ${detail.map((vinilo) => {
                    return `
                    <p>Vinilo: ${vinilo.name}</p>
                    <p>Precio por Unidad en USD: ${vinilo.amount}</p>
                    <p>Precio Total en USD: ${vinilo.totalAmount}</p>

                `;
                })}
                <p>Precio Final: ${precio}</p>
            `,
            });
            console.log("Correo electrónico enviado con éxito:", info.response);
        }
        catch (error) {
            console.error("Error al enviar el correo electrónico:", error);
        }
    });
}
exports.enviarNotificacionDeCompra = enviarNotificacionDeCompra;
