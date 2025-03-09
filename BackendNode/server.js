const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/routes.js');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));
  

app.use(cors({ origin: "http://localhost:4200", credentials: true }));



app.use('/api', paymentRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));


// const express = require('express');
// const cors = require('cors');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// require('dotenv').config();



// const app = express();
// app.use(cors({ origin: "http://localhost:4200", credentials: true }));
// app.use(express.json());


// const RAZORPAY_KEY_ID = "rzp_test_rPVpoELQpw9Mm5";
// const RAZORPAY_KEY_SECRET = "pN79jJ1oP4WrQYc5biDOqXbD";

// const razorpay = new Razorpay({
//   key_id:RAZORPAY_KEY_ID,
//   key_secret:RAZORPAY_KEY_SECRET,
// });

 
// // Order creation endpoint
// app.post('/create-order', async (req, res) => {
//   const options = {
//     amount: 49900, 
//     currency: 'INR',
//     receipt: 'subscription_001',
//     payment_capture: 1
//   };
//   console.log("📢 Received Plan ID:", options);

//   try {
//     const response = await razorpay.orders.create(options);
//     res.json({
//       id: response.id,
//       currency: response.currency,
//       amount: response.amount
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Payment verification endpoint
// app.post('/verify-payment', (req, res) => {
//   const { order_id, payment_id, signature } = req.body;

//   const generatedSignature = crypto
//     .createHmac('sha256',RAZORPAY_KEY_SECRET)
//     .update(order_id + "|" + payment_id)
//     .digest('hex');

//   if (generatedSignature === signature) {
//     res.json({ success: true, message: 'Payment verified' });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid signature' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
