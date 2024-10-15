import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import dbConnection from './configs/dbConnect.Config.js';

const app = express();

// public middlwares
app.use(bodyParser.json());

// routes
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

// add env
dotenv.config();

// db connection
dbConnection();

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
