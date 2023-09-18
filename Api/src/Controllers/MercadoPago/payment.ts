import mercadopago from "mercadopago";
import { MercadoPago } from "../../Models/MercadoPago";
import { OrderDetail } from "../../Models/orderDetail";
import { Order } from "../../Models/Order";
import { Request, Response } from "express";
import { getOrderDetail } from "../OrderDetail/getOrderDetail";

export const createOrder = async (userData: {
  title: string;
  price: number;
  units: number;
}) => {
  mercadopago.configure({
    sandbox: true,
    access_token:
      "TEST-5240565219201009-090712-67305e7f259028a53ae62015ae9f6938-1472124079",
  });

  const { title, price, units } = userData;

  const result = await mercadopago.preferences.create({
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
};


export const verifyPayment = async (queryParams: any) => {
  if (queryParams.type === "payment") {
    const data = await mercadopago.payment.findById(queryParams["data.id"]);

    const allOrderDetail = await OrderDetail.findAll();

    const detailJson = JSON.parse(JSON.stringify(allOrderDetail));
    const saveOrder = await Order.create({
      where: {
        detail: detailJson,
        tax: data.body.taxes_amount,
        amount: data.body.transaction_amount,
        state: data.body.status,
      },
    });
    OrderDetail.destroy({
      force: true,
    })
    return saveOrder;
  }
};

