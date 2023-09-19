import { OrderDetail } from "../../Models/orderDetail";

export const createOrderDetail = async (body: OrderDetail) => {
    const {name, vinylId, units, amount, taxAmount, totalAmount, orderStatus} = body
    
    const createOD = await OrderDetail.create({
        where: {
            name,
            vinylId,
            units, 
            amount,
            taxAmount,
            totalAmount,
            orderStatus 
        }
    })

    return `estan los detalles d ela compra del ${name}`
}