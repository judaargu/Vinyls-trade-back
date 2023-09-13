import { OrderDetail } from "../../Models/orderDetail";

export const createOrderDetail = async (body: OrderDetail) => {
    const {vinylId, units, amount, taxAmount, totalAmount, orderStatus} = body
    
    const createOD = await OrderDetail.create({
        where: {
            vinylId,
            units, 
            amount,
            taxAmount,
            totalAmount,
            orderStatus 
        }
    })

    
}