import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

export const getOrderDetail = async () => {
  try {
    // const orderDetail = await OrderDetail.findAll();
    // if(orderDetail.length){
    //   console.log(orderDetail)
    //   await OrderDetail.destroy({
    //     force: true,
    //   });
    //   return 'Se ha borrado con exito su Orden de Compras'

    const orderDetails = await OrderDetail.findAll();

    if (orderDetails.length > 0) {
      // Si hay registros, elimínalos uno por uno
      for (const orderDetail of orderDetails) {
        await orderDetail.destroy();
      }
      return 'Se han borrado con éxito todos los registros de OrderDetail';
  

    } else {
      return 'no se esta pudiendo borrar'
    }
  } catch (error) {
    return error
  }
  
};

export const getOrder = async () => {
  try {
    const orders= await Order.findAll();
    console.log(orders)
    if (orders.length > 0) {
      // Si hay registros, elimínalos uno por uno
      for (const order of orders) {
        await order.destroy();
      }
      return 'Se han borrado con éxito todos los registros de OrderDetail';
    } else {
      return 'no se ha podidod borra el Order'
    }
  } catch (error) {
    return error
  }
}