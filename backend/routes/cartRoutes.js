import express, { Router } from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const router = Router();

router.post("/add", authUser, addToCart);
router.post("/update", authUser, updateCart);
router.get("/get", authUser, getUserCart);

export default router;
