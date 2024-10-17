import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import dbConnection from './configs/dbConnect.Config.js';
import { protect } from './configs/passport.js';
import userRouter from './routes/userRoutes.js';

const app = express();

/*             GLOBAL MIDDLEWARES             */
app.use(morgan('dev'));
app.use(bodyParser.json());

/*                 ROUTES                  */
app.get('/', protect, (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRouter);

/*             DB CONNECTION             */
dbConnection();

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
