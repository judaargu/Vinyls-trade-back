import { Request, Response } from "express";
import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

const historial = async () => {
  const youOrder = await Order.findAll();
  return youOrder;
};

const history = async (req: Request, res: Response) => {
  try {
    const response = await historial();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export {history}
