import asyncHandler from 'express-async-handler';
import Order from '../models/orderSchema.js';

// ** @desc    Create new order
// ** @route   POST /api/v1/orders
// ** @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const { items, shippingAddress, totalPrice } = req.body;

  const order = await Order.create({
    orderItems: items,
    user: req.user._id,
    shippingAddress,
    paymentMethod: shippingAddress.paymentMethod,
    totalPrice,
  });

  res.status(201).json(order);
});

// ** @desc    Fetch all user's order
// ** @route   GET /api/v1/orders
// ** @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// ** @desc    Fetch a order by ID
// ** @route   GET /api/v1/orders/:id
// ** @access  Private
export const getOneOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("La commande que vous chercher n'existe pas");
  }

  res.status(200).json(order);
});
