import Products from '../../../models/Product';
import dbConnect from '../../../src/utils/mongo';
import { runMiddleware } from '../cors';

const handler = async (req: any, res: any) => {
  const { method, body } = req;

  await runMiddleware(req, res);

  dbConnect();

  switch (method) {
    case 'GET':
      try {
        const AllProducts = await Products.find();
        res.status(200).json(AllProducts);
      } catch (error) {
        res.status(500).json(`See ${error}`);
      }
    case 'POST':
      try {
        const Product = await Products.create(body);
        res.status(200).json(Product);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
};

export default handler;
