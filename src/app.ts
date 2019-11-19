import express,{ Application,Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import socket from 'socket.io';
import * as path from "path";
import  http from "http"



const app : Application = express();
const sokcetApp : Application = express();

app.set("port", process.env.PORT || 3000);
const server = new http.Server(app);
const io = socket(server)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({
  path: '.env'
});	
io.on("connection", function(socket: any) {
  console.log("a user connected " + `${socket}`);
    // whenever we receive a 'message' we log it out
    socket.on("message", function(message: any) {
      console.log(message);
      socket.emit("messageBalas" ,"OK")
      io.emit("broadcast", "ini Broadcast")
    });
});




app.get('/',(req:Request,res : Response ) => {
  res.sendFile(path.resolve("./src/index.html"));
})
export default server;