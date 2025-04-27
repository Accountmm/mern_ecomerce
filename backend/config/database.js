import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    const conectedDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected To Db ✅  host :${conectedDB.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
}