const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const data = require('./data');
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Ecommerce');
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug', (req, res) => {
  const { slug } = req.query;
  let product = data.products.find((x) => x.slug === slug);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({message:'Product Not Found!'});
  }
});

app.get('/api/products/id', (req, res) => {
  const { id } = req.query;
  let product = data.products.find((x) => x.id === id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({message:'Product Not Found!'});
  }
});

app.listen(port, () => {
  console.log('Server is running');
});
