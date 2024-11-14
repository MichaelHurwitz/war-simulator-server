import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from 'cors';
import { setupWebSocket } from "./sockets/webSocket";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./data/db";
import userRoutes from "./routes/userRoutes";
import combatRoutes from "./routes/combatRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));


connectDB();

const server = http.createServer(app);

setupWebSocket(server);


app.use("/api/users", userRoutes);
app.use('api/combat', combatRoutes)


app.use(errorHandler);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  export default app;
  