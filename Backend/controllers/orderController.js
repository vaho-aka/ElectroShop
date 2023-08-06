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
