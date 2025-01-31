import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files?.image1[0];
    const image2 = req.files.image2 && req.files?.image2[0];
    const image3 = req.files.image3 && req.files?.image3[0];
    const image4 = req.files.image4 && req.files?.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "auto",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    return res.status(500).json({ success: false, mesaage: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ success: true, products, message: "Products got" });
  } catch (error) {
    return res.status(500).json({ success: false, mesaage: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ success: true, message: "Product removed!" });
  } catch (error) {
    return res.status(500).json({ success: false, mesaage: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res
      .status(200)
      .json({ success: true, product, message: "Product fetched!" });
  } catch (error) {
    return res.status(500).json({ success: false, mesaage: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
