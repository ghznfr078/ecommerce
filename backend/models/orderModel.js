import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Order Placed" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
