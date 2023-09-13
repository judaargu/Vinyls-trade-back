import { OrderDetail } from "../../Models/orderDetail";

export const getOrderDetail = async (queryParams: any) => {
  const allOrderDetail = await OrderDetail.findAll();
  OrderDetail.destroy({
    where: {
      id: queryParams,
    },
    force: true,
  });
  return allOrderDetail
};
