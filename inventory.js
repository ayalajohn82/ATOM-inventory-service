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
  res.send('get product endpoint');
});

app.post('/products', (req, res) => {
  res.send('create product endpoint');
});

app.patch('/products/:productId', (req, res) => {
  res.send('update quantity endpoint');
});

module.exports.handler = serverless(app);