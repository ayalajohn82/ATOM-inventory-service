const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient();


const createProduct = (productID, name, quantity) => {
  if (typeof productId !== 'string') {
    console.error({ error: '"productfId" must be a string' });
  } else if (typeof name !== 'string') {
    console.log({ error: '"name" must be a string' });
  }

  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      productId,
      name,
      quantity,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      console.error({ error: 'Could not create product' });
    }
    console.log({ productId, name,  quantity });
  });
};

const getProduct = (productId) => {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { productId },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error({ error: 'Could not get product' });
    }
    if (result.Item) {
      const {productId, name, quantity} = result.Item;
      console.log({ productId, name, quantity });
    } else {
      console.error({ error: "User not found" });
    }
  });
};

const updateProductQuantity = (productId, quantity) => {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { productId },
    UpdateExpression: 'set quantity = quantity - :val',
    ConditionExpression: 'quantity >= :val',
    ExpressionAttributeValues: {
      ':val': quantity,
    },
    ReturnValues:"UPDATED_NEW"
  };

  dynamoDb.update(params, function(err, result) {
    if (err) {
        console.error({ error: "Unable to update item. Error JSON: " + err.message });
    } else {
        console.log(`Updated product ${productId}: ${result}`);
    }
  });
};

const bulkInsertProducts = (requests) => {
  const params = {
    RequestItems: {}
  };
  params.RequestItems[PRODUCTS_TABLE] = requests;

  dynamoDb.batchWriteItem(params, (response) => {
    if(err) {
      console.log(err);
      return false;
    } else if(response.unprocessedItems) {
      bulkInsertProducts(response.unprocessedItems);
    }
    console.log('successfully added products');
    return true;
  });
};

module.export = { createProduct, getProduct, updateProductQuantity, bulkInsertProducts };