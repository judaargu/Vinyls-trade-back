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
exports.recieveWebhook = exports.createOrder = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const MercadoPago_1 = require("../../Models/MercadoPago");
const createOrder = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    mercadopago_1.default.configure({
        access_token: "TEST-5240565219201009-090712-67305e7f259028a53ae62015ae9f6938-1472124079",
    });
    const { title, price, units } = userData;
    const result = yield mercadopago_1.default.preferences.create({
        items: [
            {
                title: title,
                currency_id: "USD",
                unit_price: price,
                quantity: units,
            },
        ],
        back_urls: {
            success: "http://localhost:3001",
            failure: "http://localhost:3001/failure",
            pending: "http://localhost:3001/pending",
        },
        notification_url: "https://5f7e-191-81-164-140.ngrok.io/webhook",
        auto_return: 'approved',
    });
    return result.body.init_point;
});
exports.createOrder = createOrder;
const recieveWebhook = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    if (queryParams.type === "payment") {
        const data = yield mercadopago_1.default.payment.findById(queryParams["data.id"]);
        console.log(data);
        const createMP = MercadoPago_1.MercadoPago.create({
            idMP: data.response.order.id,
            fistName: data.response.payer.first_name,
            lastaName: data.response.payer.last_name,
            email: data.response.payer.email,
            status: data.response.status,
            statusDetail: data.response.status_detail,
            amount: data.response.transaction_detail.total_paid_amount,
        });
        return data;
    }
});
exports.recieveWebhook = recieveWebhook;
