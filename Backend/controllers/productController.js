import asyncHandler from 'express-async-handler';
import Product from '../models/productSchema.js';
import Review from '../models/ReviewSchema.js';

// ** @desc    Fetch all products
// ** @route   GET /api/product
// ** @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// ** @desc    Fetch one product by ID
// ** @route   GET /api/product/:id
// ** @access  Public
export const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Le produit que vous rechercher n'exist pas");
  }

  const reviews = await Review.find({ productId: product._id });
  res.json({ product, reviews });
});

// ** @desc    Rate a product
// ** @route   GET /api/product/:id
// ** @access  Private
export const createRating = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Le produit que vous rechercher n'exist pas");
  }

  const alreadyRated = await Review.find({ user: req.user._id });
  if (alreadyRated) {
    throw new Error('Vous avze déjà evaluer ce produit');
  }

  const { rating, comment } = req.body;

  await Review.create({
    rating,
    comment,
    productId: product._id,
    user: req.user._id,
  });
  const reviews = await Review.find({ productId: product._id });

  product.numReviews++;
  product.rating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

  res.status(201).json({ status: 'success' });
});
