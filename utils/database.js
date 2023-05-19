import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already running');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      userUnifiedTopology: true
    });

    isConnected = true;

    console.log('Mongo DB connected')
  } catch (e) {
    console.log(e)
  }
}