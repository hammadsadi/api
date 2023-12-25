import mongoose from "mongoose";

// Connect With MongoDB
const connectWithMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log(`MongoDB Connected Successful`.bgYellow.black);
  } catch (error) {
    console.log(error.message);
  }
};

// Export
export default connectWithMongoDB;
