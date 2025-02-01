// COD
const placeOrder = async (req, res) => {};

// Stripe
const placeOrderStripe = async (req, res) => {};

// Razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders for admin
const allOrders = async (req, res) => {};

//User orders for frontend
const userOrders = async (req, res) => {};

// update order status -- only admin
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
