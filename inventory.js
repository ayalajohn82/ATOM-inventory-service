const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Init');
});

module.exports.handler = serverless(app);