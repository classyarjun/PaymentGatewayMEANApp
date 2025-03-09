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

