import express, { Router } from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = Router();

router.post(
  "/add",
  adminAuth,
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct
);
router.get("/list", adminAuth, listProducts);
router.delete("/remove/:productId", adminAuth, removeProduct);
router.get("/single/:productId", adminAuth, singleProduct);

export default router;
