import express,{ Application,Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import socket from 'socket.io';

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({
  path: '.env'
});	

app.get('/',(req:Request,res : Response ) => {
    res.send('TS App is Running')
})
export default app;