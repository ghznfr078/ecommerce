import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ success: true, message: "Order Placed!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe
const placeOrderStripe = async (req, res) => {};

// Razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders for admin
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res
      .status(200)
      .json({ success: true, orders, message: "All orders fetched" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//User orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    return res
      .status(200)
      .json({ success: true, orders, message: "All orders fetched" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update order status -- only admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    return res.status(200).json({ success: true, message: "Status updated!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
