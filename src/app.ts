import express,{ Application,Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import socket from 'socket.io';
import * as path from "path";

const app : Application = express();
// app.set("port", process.env.PORT || 3000);
const http = require('http').Server(app);
const io = socket(http)






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({
  path: '.env'
});	
io.on("connection", function(socket: any) {
  console.log("a user connected");
});
app.get('/',(req:Request,res : Response ) => {
  res.sendFile(path.resolve("./src/index.html"));
})
export default app;