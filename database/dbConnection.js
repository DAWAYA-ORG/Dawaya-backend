import { connect } from 'mongoose';

const dbConn = connect('mongodb://localhost:27017/dawaya').then(() => {
  console.log('Database connected');
});

export default dbConn;
