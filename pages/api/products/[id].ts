import Products from '../../../models/Product';
import dbConnect from '../../../src/utils/mongo';

const handler = async (req: any, res: any) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  dbConnect();

  switch (method) {
    case 'GET':
      try {
        const product = await Products.findById(id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(`See ${error}`);
      }
    case 'PUT':
      try {
        const Product = await Products.create(body);
        res.status(200).json(Product);
      } catch (error) {
        res.status(500).json(error);
      }
    case 'DELETE':
      try {
        await Products.findByIdAndDelete(id);
        res.status(200).json('Product Deleted!');
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
};

export default handler;
