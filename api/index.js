import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouters from './routes/userRoute.js'
import authRouters from './routes/authRoute.js';

const app = express();

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