import { connect } from 'mongoose';

const dbConnection = () => {
  connect(process.env.MongoUrl)
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('something went wrong', err);
    });
};

export default dbConnection;
