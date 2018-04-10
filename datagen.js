const faker = require('faker');
const _ = require('lowdash');
const { bulkInsertProducts } = require('./database');

const generateProductData = (counter) => {
  let requests = [];

  for(let i = 0; i < 24; i++) {
    const request = {
      putRequest: {
        Item: {
          productId: counter,
          name: faker.commerce.productName(),
          quantity: (Math.random() * 4500).toFixed(2),
        }
      }
    }
    counter += 1;
    requests.push(request);
  }
  bulkInsertProducts(requests, (response) => {
    if(counter < 10000000) {
      generateProductData(counter);
    }
  });
};