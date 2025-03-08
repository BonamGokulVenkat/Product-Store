import express from "express";
import { allProducts,createProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/",allProducts);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

export default router;