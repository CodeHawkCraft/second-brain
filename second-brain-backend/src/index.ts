import express from "express";
import connectDB from "./db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import appRoutes from './routes'
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import { searchVector } from "./utils/run";
const app = express();
app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(cookieParser());

// searchVector();

async function startServer() {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.use('/api', appRoutes);
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`server is running on  ${port}`);
  });
}

startServer();
