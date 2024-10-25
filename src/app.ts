import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import dbConnection from './configs/dbConnect';
import { protect } from './configs/passport';
import userRouter from './routes/userRoutes';

const app = express();

/*             GLOBAL MIDDLEWARES             */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

/*                 ROUTES                  */
app.get('/', protect, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRouter);

/*             DB CONNECTION             */
dbConnection();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
