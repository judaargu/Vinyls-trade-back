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
const Order_1 = require("../../Models/Order");
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
            success: "https://vinyls-trade-back-production.up.railway.app",
            failure: "https://vinyls-trade-back-production.up.railway.app",
        },
        auto_return: "approved",
        notification_url: "https://vinyls-trade-back-production.up.railway.app/webhook",
    });
    return result.body.init_point;
});
exports.createOrder = createOrder;
const verifyPayment = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    if (queryParams.type === "payment") {
        const data = yield mercadopago_1.default.payment.findById(queryParams["data.id"]);
        const allOrderDetail = yield orderDetail_1.OrderDetail.findAll();
        const detailJson = JSON.parse(JSON.stringify(allOrderDetail));
        const saveOrder = yield Order_1.Order.create({
            where: {
                detail: detailJson,
                tax: data.body.taxes_amount,
                amount: data.body.transaction_amount,
                state: data.body.status,
            },
        });
        orderDetail_1.OrderDetail.destroy({
            force: true,
        });
        return saveOrder;
    }
});
exports.verifyPayment = verifyPayment;
