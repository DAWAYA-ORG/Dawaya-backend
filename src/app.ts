import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dbConnection from './configs/dbConnect';
import { protect , configurePassport } from './configs/passport';
import userRouter from './routes/userRoutes';
import passport from 'passport';
import session from 'express-session';

const app = express();

/*             GLOBAL MIDDLEWARES             */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Initialize passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());
console.log(process.env);
configurePassport();

/*                 ROUTES                  */
app.get('/', protect, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRouter);

/*             DB CONNECTION             */
dbConnection();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
