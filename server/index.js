const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const  data  = require('./data');
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from Ecommerce');
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(port, () => {
  console.log('Server is running');
});
