import Orders from '../../../models/Order';
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
        const order = await Orders.findById(id);
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(`See ${error}`);
      }

    case 'DELETE':
      try {
        await Orders.findByIdAndDelete(id);
        res.status(200).json('Order Deleted');
      } catch (error) {
        res.status(500).json(`See error: ${error}`);
      }

    case 'PATCH':
      try {
        const order = await Orders.findByIdAndUpdate(id, body, {
          new: true,
        });
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(`See ${error}`);
      }
      break;
  }
};

export default handler;
