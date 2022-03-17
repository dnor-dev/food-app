// import Cookies from 'universal-cookie';
import Cookies from 'cookies';

const handler = async (req: any, res: any) => {
  const { body, method } = req;
  let cookies = new Cookies(req, res);
  let token = process.env.TOKEN;
  switch (method) {
    case 'POST':
      try {
        const { username, password } = body;
        if (
          username === process.env.USERNAME &&
          password === process.env.PASSWORD
        ) {
          cookies.set('food_app', token, {
            httpOnly: true,
            maxAge: 600000,
          });
          res.status(200).json('Successful!');
        }
      } catch (error) {
        res.status(500).json('Invalid Credentials!');
      }

      break;
  }
};

export default handler;
