import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable in the .env.local',
  );
}

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    return conn;
  } catch (error) {
    console.log(`The error is coming from ${error}`);
  }
};

export default dbConnect;
