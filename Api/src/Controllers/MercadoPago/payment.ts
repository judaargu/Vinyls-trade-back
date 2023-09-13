import mercadopago from "mercadopago";
import { MercadoPago } from "../../Models/MercadoPago";

export const createOrder = async (userData: {
  title: string;
  price: number;
  units: number;
}) => {
  mercadopago.configure({
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
      success: "http://localhost:3001",
      failure: "http://localhost:3001/failure",
      pending: "http://localhost:3001/pending",
    },
    notification_url: "https://5f7e-191-81-164-140.ngrok.io/webhook",
    auto_return: 'approved',
  });

  return result.body.init_point;
};

export const recieveWebhook = async (queryParams: any) => {
  if (queryParams.type === "payment") {
    const data = await mercadopago.payment.findById(queryParams["data.id"]);
    console.log(data);
    const createMP = MercadoPago.create({
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
};
