import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";


dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());


connectDB();


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  export default app;
  