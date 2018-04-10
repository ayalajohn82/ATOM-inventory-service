const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const { createProduct, getProduct, updateProductQuantity } = require('./database');

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Init');
});

app.get('/products/:productId', (req, res) => {
  getProduct(req.params.productId);
  res.send('get product endpoint');
});

app.post('/products', (req, res) => {
  const { productId, name, quantity } = req.body;
  createProduct(productId, name, quantity);
  res.send('create product endpoint');
});

app.patch('/products/:productId', (req, res) => {
  updateProductQuantity(req.params.productId, req.body.quantity);
  res.send('update quantity endpoint');
});

module.exports.handler = serverless(app);