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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderDetail = void 0;
const orderDetail_1 = require("../../Models/orderDetail");
const createOrderDetail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, vinylId, units, amount, taxAmount, totalAmount, orderStatus } = body;
    const createOD = yield orderDetail_1.OrderDetail.create({
        where: {
            name,
            vinylId,
            units,
            amount,
            taxAmount,
            totalAmount,
            orderStatus
        }
    });
    return `estan los detalles de la compra del ${name}`;
});
exports.createOrderDetail = createOrderDetail;
