
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
// import { isAuth, isAdmin } from '../utils.js';


// GETTIN ORDERS
export const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
    }
);
// GETTING ORDER
export const getOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
        if (order) {
          res.send(order);
        } else {
          res.status(404).send({ message: 'Order Not Found' });
        }
    }
);
// CREATE ORDER
export const createOrder = expressAsyncHandler(async (req, res) => {
        const order = new Order({
          orderItem: req.body.orderItem,
          username: req.body.username,
          payment: req.body.payment,
          participants: req.body.participants,
          date: req.body.date,
          shift: req.body.shift,
          itemPrice: req.body.price,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
);
// DELETE ORDER
export const deleteOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
        if (order) {
          const deletedOrder = await order.remove();
          res.send({ message: 'Order Deleted', product: deletedOrder });
        } else {
          res.status(404).send({ message: 'Order Not Found' });
        }
    }
);
// PAY ORDER
export const payOrder = expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
          };
          const updatedOrder = await order.save();
          res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
          res.status(404).send({ message: 'Order Not Found.' });
        }
    }
);
