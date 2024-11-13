import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { setupWebSocket } from "./sockets/webSocket";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./data/db";
import userRoutes from "./routes/userRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());


connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

setupWebSocket(io);


app.use("/api/users", userRoutes);


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  export default app;
  