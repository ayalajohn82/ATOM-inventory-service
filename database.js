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
