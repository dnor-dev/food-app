import Orders from '../../../models/Order';
import dbConnect from '../../../src/utils/mongo';
import { runMiddleware } from '../cors';

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res);
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case 'GET':
      try {
        const AllOrders = await Orders.find();
        res.status(200).json(AllOrders);
      } catch (error) {
        res.status(500).json(`See ${error}`);
      }
    case 'POST':
      try {
        const Order = await Orders.create(body);
        res.status(200).json(Order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
};

export default handler;
