import { OrderDetail } from "../../Models/orderDetail";

export const createOrderDetail = async (body: OrderDetail) => {
    const cart: any = body
    console.log(cart)
    const cartMap = cart.map(async (c: any) => {

        const createOD = await OrderDetail.create({
                name : c.name,
                vinylId: c.vinylId,
                units: c.units, 
                amount: c.amount,
                taxAmount: c.taxAmount,
                totalAmount: c.totalAmount,
                orderStatus: c.orderStatus 
        })
        return createOD
    })
    try {
        return {status: 200, json: cartMap};
        
    } catch (error) {
        return {status: 500, json: 'error en el servidor'}
    }
}