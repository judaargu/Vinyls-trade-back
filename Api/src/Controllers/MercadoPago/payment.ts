import mercadopago from "mercadopago";
import { MercadoPago } from "../../Models/MercadoPago";
import { OrderDetail } from "../../Models/orderDetail";
import { Order } from "../../Models/Order";
import { Request, Response } from "express";
import { getOrder, getOrderDetail } from "../OrderDetail/getOrderDetail";
import { postOrder } from "../Order/postOrder";
import { enviarNotificacionDeCompra } from "../Notifications/Notifications";

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
      success: "https://vinils-trade-client.vercel.app",
      failure: "https://vinils-trade-client.vercel.app",
    },
    auto_return: "approved",
    notification_url: "https://ca68-191-81-191-48.ngrok-free.app/webhook",
  });

  return result.body.init_point;
};

export const verifyPayment = async (queryParams: any) => {
  try {
    if (queryParams.type === "payment") {
      await getOrder();
      const data = await mercadopago.payment.findById(queryParams["data.id"]);

      const allOrderDetail = await OrderDetail.findAll();

      const saveOrder: any = await postOrder(
        data.response.payer.email,
        allOrderDetail,
        data.response.taxes_amount,
        data.response.transaction_amount,
        data.response.status
      );
      const saveNotification = await enviarNotificacionDeCompra(
        saveOrder.dataValues.userEmail,
        saveOrder.dataValues.detail,
        saveOrder.dataValues.total
      );
      await getOrderDetail();
      return saveOrder;
    }
  } catch (error) {
    return error;
  }
};
