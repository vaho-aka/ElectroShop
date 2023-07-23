import asyncHandler from 'express-async-handler';
import Product from '../models/productSchema.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("L'object que vous rechercher n'exist pas");
  }

  res.json(product);
});
