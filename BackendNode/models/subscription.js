const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  planId: String,
  paymentId: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
