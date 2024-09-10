import mongoose from "mongoose";

const connectDB = async () => {
  const mongoDb = process.env.MONGO_URI;
  //console.log(mongoDb);
  
  try {
    const connect = await mongoose.connect(mongoDb,{
      useNewUrlParser: true,  // Old bugs avoid pannitu, new parse method use pannum
      useUnifiedTopology: true, // Efficient connection handling engine use pannum
    });
    console.log(`MongoDB connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // Error aanaal app close aagum
  }
};

export default connectDB;
