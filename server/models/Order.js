const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: {
        type: String,
        required: [true, 'Item name is required']
      },
      price: {
        type: Number,
        required: [true, 'Item price is required'],
        min: [0, 'Price must be non-negative']
      },
      quantity: {
        type: Number,
        required: [true, 'Item quantity is required'],
        min: [1, 'Quantity must be at least 1']
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount must be non-negative']
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
