import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/dbconnect.js';
import authRouter from './routes/auth.routes.js';
import CookieParser from 'cookie-parser';
import teacherRouter from './routes/teacher.route.js';



dotenv.config();

const app=express();
 const port=process.env.PORT || 5000;

 app.use(cors());
//  To parse JSON request bodies(middlewares)
 app.use (express.json())
 app.use(CookieParser());

app.use("/api/auth",authRouter);
app.use("/api/teacher",teacherRouter)

 try {
  await db.connect();   
  console.log("MySQL Connected Successfully!");
} catch (err) {
  console.error("MySQL Connection Failed:", err.message);
}




// Arrow Functioin is used here.
app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})


