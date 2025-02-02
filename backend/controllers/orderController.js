import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = "usd";
const deliveryCharges = 10;
// payment gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    return res.status(201).json({
      success: true,
      session_url: session.url,
      message: "Order Placed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res.status(201).json({
        success: true,
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.status(500).json({
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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
  verifyStripe,
};
