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
const Order_1 = require("../../Models/Order");
const orderDetail_1 = require("../../Models/orderDetail");
const getOrderDetail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const orderDetail = await OrderDetail.findAll();
        // if(orderDetail.length){
        //   console.log(orderDetail)
        //   await OrderDetail.destroy({
        //     force: true,
        //   });
        //   return 'Se ha borrado con exito su Orden de Compras'
        const orderDetails = yield orderDetail_1.OrderDetail.findAll();
        if (orderDetails.length > 0) {
            // Si hay registros, elimínalos uno por uno
            for (const orderDetail of orderDetails) {
                yield orderDetail.destroy();
            }
        }
        const orders = yield Order_1.Order.findAll();
        if (orders.length > 0) {
            // Si hay registros, elimínalos uno por uno
            for (const order of orders) {
                yield order.destroy();
            }
            return 'Se han borrado con éxito todos los registros de OrderDetail';
        }
        else {
            return 'no se esta pudiendo borrar';
        }
    }
    catch (error) {
        return error;
    }
});
exports.getOrderDetail = getOrderDetail;
