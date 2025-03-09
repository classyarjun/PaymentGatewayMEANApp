const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

//? testing code by arjun
const RAZORPAY_KEY_ID = "rzp_test_rPVpoELQpw9Mm5";
const RAZORPAY_KEY_SECRET = "pN79jJ1oP4WrQYc5biDOqXbD";

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const creteOrder = async (req, res) => {
  const options = {
    amount: 49900,
    currency: "INR",
    receipt: "subscription_001",
    payment_capture: 1,
  };
  
console.log(options);

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest("hex");
  if (generatedSignature === signature) {
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};

module.exports = { creteOrder, verifyPayment };
