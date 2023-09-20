import { Request, Response } from "express";
import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

const history = async () => {
  const youOrder = await Order.findAll();
  return youOrder;
};

// const history = async (req: Request, res: Response) => {
//   try {
//     const response = await historial();
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

const postOrder = async (userEmail: string, detail: object[], tax: number, total:number, state: string) => {
  try {
    
      const saveOrder = await Order.create({
          userEmail,
          detail,
          tax,
          total, 
          state
      });
      return saveOrder
  } catch (error) {
    return error
  }
}

export {history, postOrder}
