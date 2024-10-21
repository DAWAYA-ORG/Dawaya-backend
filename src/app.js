import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import dbConnection from './configs/dbConnect.js';
import { protect } from './configs/passport.js';
import userRouter from './routes/userRoutes.js';

const app = express();

/*             GLOBAL MIDDLEWARES             */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

/*                 ROUTES                  */
app.get('/', protect, (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRouter);

/*             DB CONNECTION             */
dbConnection();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
