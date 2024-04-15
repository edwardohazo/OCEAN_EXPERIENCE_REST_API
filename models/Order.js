import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true
    },
    orderItem: {
        price: { type: Number, required: true },
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
          required: true,
        },
    },
    participants: {
        type: Number,
        required: true,
    },
    shift: {
      type: String
    },
    date: {
        type: Date
    },
    payment: {
      paymentMethod: String,
      paymentResult: {
        orderID: String,
        payerID: String,
        paymentID: String,
      },
    },
    taxPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;