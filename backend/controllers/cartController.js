import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await User.findById(userId);

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({ success: true, message: "Added to cart!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);

    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "cart updated!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);

    let cartData = await userData.cartData;
    return res
      .status(200)
      .json({ success: true, cartData, message: "cart updated!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
