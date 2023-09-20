import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

export const getOrderDetail = async () => {
  try {
    const orderDetail = await OrderDetail.findAll();
    if(orderDetail.length){
      console.log(orderDetail)
      await OrderDetail.destroy();
      return 'Se ha borrado con exito su Orden de Compras'

    } else {
      return 'no se esta pudiendo borrar'
    }
    
  } catch (error) {
    return error
  }
  
};
