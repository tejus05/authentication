import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouters from './routes/userRoute.js'
import authRouters from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use(cookieParser());

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(()=>{console.log("Connected to MonogDB")})
  .catch((err)=>{console.log(err)});

app.listen(3000, () => {
  console.log('Server listening on 3000')
});

app.use("/api/user", userRouters);

app.use("/api/auth", authRouters);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})