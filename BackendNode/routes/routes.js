

const express = require("express");
const { creteOrder, verifyPayment } = require("../controllers/paymentControllers.js");

const router = express.Router();

router.post("/create-order", creteOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
