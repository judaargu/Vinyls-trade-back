import { OrderDetail } from "../../Models/orderDetail";

export const createOrderDetail = async (body: OrderDetail) => {
    const {name, vinylId, units, amount, taxAmount, totalAmount, orderStatus} = body
    try {
        const createOD = await OrderDetail.create({
                name,
                vinylId,
                units, 
                amount,
                taxAmount,
                totalAmount,
                orderStatus 
        })
        return {status: 200, json: createOD};
        
    } catch (error) {
        return {status: 500, json: 'error en el servidor'}
    }
}