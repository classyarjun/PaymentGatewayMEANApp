const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const RAZORPAY_KEY_ID = "rzp_test_rPVpoELQpw9Mm5";
const RAZORPAY_KEY_SECRET = "pN79jJ1oP4WrQYc5biDOqXbD";

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});


const creteOrder = async (req, res) => {
  const { amount } = req.body; 

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }
  const options = {
    amount: amount*100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  console.log("📝 Order Options:", options);

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("❌ Error Creating Order:", error);
    res.status(500).send({ error: "Failed to create order" });
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
