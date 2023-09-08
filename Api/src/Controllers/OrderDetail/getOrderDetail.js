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
exports.getOrderDetail = void 0;
const orderDetail_1 = require("../../Models/orderDetail");
const getOrderDetail = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrderDetail = yield orderDetail_1.OrderDetail.findAll();
    orderDetail_1.OrderDetail.destroy({
        where: {
            id: queryParams,
        },
        force: true,
    });
    return allOrderDetail;
});
exports.getOrderDetail = getOrderDetail;
