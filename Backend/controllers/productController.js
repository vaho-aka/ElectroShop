import asyncHandler from 'express-async-handler';
import Product from '../models/productSchema.js';
import Review from '../models/ReviewSchema.js';

// ** @desc    Fetch all products
// ** @route   GET /api/product
// ** @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
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

  const reviews = await Review.find({ productId: product._id }).populate(
    'user'
  );
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

  const alreadyRated = (await Review.find({ productId: product._id })).find(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (alreadyRated) {
    throw new Error('Vous avze déjà evaluer ce produit');
  }

  const { rating, comment } = req.body;

  await Review.create({
    rating: +rating,
    comment,
    productId: product._id,
    user: req.user._id,
  });
  const reviews = await Review.find({ productId: product._id }).populate(
    'user'
  );

  product.numReviews++;
  product.rating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

  await product.save();

  res.json({ product, reviews });
});
