import mongoose from 'mongoose';

import { env } from '../utils/env.js'

export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    console.log(`Connecting to MongoDB at ${url}/${db}`);
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,/*&appName=Cluster0*/
      );
       console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e.message);
    throw e;
  }
};
