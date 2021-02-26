import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import messageRoutes from './routes/messages';

const app = express();

dotenv.config();
app.use(express.json());
app.use(morgan("common"));
const apiLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
  });

app.use(apiLimit);

try {
    createConnection();
} catch (error) {
    console.log(error);
}

app.use('/api/messages',messageRoutes);
const PORT = process.env.PORT;

app.listen(PORT, ()=>
{
    console.log('server listening on port 5000');
    
})





