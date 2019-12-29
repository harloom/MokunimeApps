import express,{ Application,Request,Response,NextFunction } from 'express';

import socket from 'socket.io';
import  bodyParser from 'body-parser';
import  cookieParser from 'cookie-parser';
import Controller from './interfaces/controller.interfaces';
import errorMiddleware from './middleware/error.middleware';
import Connect from './db/monggose-db';
import  dotenv from "dotenv";

import * as path from "path";
import cors from "cors";
import { createServer, Server } from 'http';
import morgan from 'morgan';
import helmet from 'helmet';


class App{
  public app: Application;
  public server : Server;
  public io : SocketIO.Server ;


  constructor(controller : Controller[]){
    
    this.app = express();
    this.intialzieDotEnv()
    this.app.set("port", process.env.PORT || 3000);
    this.server = createServer(this.app);
    this.connectDatabase();
    this.initializeMiddleWare();
    this.io = socket(this.server);
    this.initializeController(controller);
    this.initializeErrorHandling();
   
  }
  public getServer() {
    return this.app;
  }

  public listen() {
    console.log("Setup : listen");
    this.server.listen(process.env.PORT, () => {
      this.initializeSocketIO()
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
  

  private intialzieDotEnv(){
    console.log("Setup : intialzieDotEnv");
    dotenv.config({
      path: '.env'
    })
  }

  private initializeMiddleWare(){
    console.log("Setup : InitializeMiddleWare");

    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(morgan('tiny'));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended:true}));
    this.app.use(cookieParser());
    
    this.app.get('/',(req:Request,res : Response ) => {
  res.sendFile(path.resolve("./src/index.html"));
})
  }

  private initializeErrorHandling() {
    console.log("Setup : InitializeErrorHandling");
    this.app.use(errorMiddleware);
  }

  private connectDatabase(){
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    // const db = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
    const db = `mongodb://localhost:27017/${MONGO_PATH}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`

    Connect({ db });
  }

  private initializeController(controllers : Controller[]){
    console.log("Setup : initializeController");
    controllers.forEach((controller) => {
      // console.log(controller);
      this.app.use('/', controller.router);
    });
  }

  private initializeSocketIO(){
  console.log("Setup : Initialize Socket Io");
  this.io.on('connection',(socket)=>{
    console.log("a user connected " + `${socket}`);
      socket.on("DataUser", (data: any) =>{
        socket.emit("respon" ,"OK")
      });
  });
        

      
  }
}
export default App
