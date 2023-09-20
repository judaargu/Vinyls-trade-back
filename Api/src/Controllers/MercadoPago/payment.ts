import mercadopago from "mercadopago";
import { MercadoPago } from "../../Models/MercadoPago";
import { OrderDetail } from "../../Models/orderDetail";
import { Order } from "../../Models/Order";
import { Request, Response } from "express";
import { getOrderDetail } from "../OrderDetail/getOrderDetail";
import { postOrder } from "../Order/postOrder";

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
    notification_url: "https://vinyls-trade-back-production.up.railway.app/webhook",
  });

  return result.body.init_point;
};


export const verifyPayment = async (queryParams: any) => {
  try {
    
    if (queryParams.type === "payment") {
      const data = await mercadopago.payment.findById(queryParams["data.id"]);
      
  
      const allOrderDetail = await OrderDetail.findAll();
      
      const saveOrder = await postOrder(allOrderDetail, data.response.taxes_amount, data.response.transaction_amount, data.response.status)
      return saveOrder;
    }
  } catch (error) {
    return error
  }
};

