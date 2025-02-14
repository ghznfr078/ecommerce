import express, { Router } from "express";
import authUser from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";

const router = Router();
// admin features
router.get("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

// payment features
router.post("/place", authUser, placeOrder);
router.post("/stripe", authUser, placeOrderStripe);
router.post("/razorpay", authUser, placeOrderRazorpay);

// User feature
router.get("/user-orders", authUser, userOrders);

// verify payment
router.post("/verifyStripe", authUser, verifyStripe);

export default router;
