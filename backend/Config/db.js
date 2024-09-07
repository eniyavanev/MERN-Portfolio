import mongoose from "mongoose";

const connectDB = async () => {
  const mongoDb = process.env.MONGO_URI;
  //console.log(mongoDb);
  
  try {
    const connect = await mongoose.connect(mongoDb,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
