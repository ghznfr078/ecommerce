import express from "express";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid Email!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter strong password!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    return res
      .status(201)
      .json({ success: true, token, message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res
        .status(200)
        .json({ success: true, token, message: "User login successfully!" });
    }
    if (!isMatch) {
      return res
        .status(402)
        .json({ success: false, message: "invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ success: true, token, message: "Admin login successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { registerUser, loginUser, adminLogin };
