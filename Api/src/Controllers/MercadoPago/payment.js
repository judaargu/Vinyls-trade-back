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
exports.verifyPayment = exports.createOrder = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const orderDetail_1 = require("../../Models/orderDetail");
const getOrderDetail_1 = require("../OrderDetail/getOrderDetail");
const postOrder_1 = require("../Order/postOrder");
const Notifications_1 = require("../Notifications/Notifications");
const createOrder = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    mercadopago_1.default.configure({
        sandbox: true,
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
            success: "https://vinils-trade-client.vercel.app",
            failure: "https://vinils-trade-client.vercel.app",
        },
        auto_return: "approved",
        notification_url: "https://vinyls-trade-back-production.up.railway.app/webhook",
    });
    return result.body.init_point;
});
exports.createOrder = createOrder;
const verifyPayment = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(queryParams.type);
    try {
        if (queryParams.type === "payment") {
            yield (0, getOrderDetail_1.getOrder)();
            console.log(queryParams['data.id']);
            const data = yield mercadopago_1.default.payment.findById(queryParams["data.id"]);
            console.log(data);
            const allOrderDetail = yield orderDetail_1.OrderDetail.findAll();
            const saveOrder = yield (0, postOrder_1.postOrder)(data.response.payer.email, allOrderDetail, data.response.taxes_amount, data.response.transaction_amount, data.response.status);
            const saveNotification = yield (0, Notifications_1.enviarNotificacionDeCompra)(saveOrder.dataValues.userEmail, saveOrder.dataValues.detail, saveOrder.dataValues.total);
            yield (0, getOrderDetail_1.getOrderDetail)();
            console.log(saveOrder);
            return saveOrder;
        }
        else {
            return 'no entro al if';
        }
    }
    catch (error) {
        return error;
    }
});
exports.verifyPayment = verifyPayment;
