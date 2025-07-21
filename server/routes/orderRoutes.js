const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST: Create an order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, items, totalAmount } = req.body;

    // ✅ Validate required fields
    if (
      !customerName ||
      !customerPhone ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof totalAmount !== 'number'
    ) {
      return res.status(400).json({
        message: 'Missing required fields or invalid data format',
        details: {
          customerName: !!customerName,
          customerPhone: !!customerPhone,
          itemsValid: Array.isArray(items) && items.length > 0,
          totalAmountValid: typeof totalAmount === 'number',
        },
      });
    }

    // ✅ Clean the items (remove `id`, avoid _id conflict)
    const cleanedItems = items.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity
    }));

    // ✅ Create and save the order
    const newOrder = new Order({
      customerName,
      customerPhone,
      items: cleanedItems,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order saved:", savedOrder);

    res.status(201).json({
      message: 'Order saved successfully',
      order: savedOrder
    });

  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ message: 'Server error. Could not save order.' });
  }
});

// GET: Fetch all orders (latest first)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Server error. Could not fetch orders.' });
  }
});

module.exports = router;
