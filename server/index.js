const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const data = require('./data');
const port = process.env.PORT || 5000;
const seedRouter = require("./routes/seedRoutes")
const productRouter = require("./routes/productRouter")
const userRouter = require("./routes/userRouter")
const orderRouter = require("./routes/orderRouter")


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(err);
  });

  app.use('/api/create/product',seedRouter)
  app.use('/api/products',productRouter)
  app.use('/api/create',seedRouter)
  app.use('/api/login',userRouter)
  app.use('/api/order',orderRouter)
  

app.get('/', (req, res) => {
  res.send('Hello from Ecommerce');
});



app.listen(port, () => {
  console.log('Server is running');
});
