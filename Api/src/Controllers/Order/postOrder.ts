import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

export const historial = async () => {
  const youOrder = await Order.findAll();
  return youOrder;
}
