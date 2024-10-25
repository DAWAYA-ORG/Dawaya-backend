import { connect } from 'mongoose';

const dbConnection = (): void => {
  connect(process.env.MongoUrl as string)
    .then(() => {
      console.log('Database connected');
    })
    .catch((err: Error) => {
      console.log('something went wrong', err);
    });
};

export default dbConnection;
