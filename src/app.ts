import express,{ Application,Request,Response,NextFunction } from 'express';
import  bodyParser from 'body-parser';
import  cookieParser from 'cookie-parser';
import Controller from './interfaces/controller.interfaces';
import errorMiddleware from './middleware/error.middleware';
import Connect from './db/monggose-db';
import  dotenv from "dotenv";
import  socket ,{Server} from 'socket.io';
import * as path from "path";
import http from "http"


class App{
  public app: Application;
  public server : http.Server;
  public io : Server;


  constructor(controller : Controller[]){
    this.app = express();
    this.intialzieDotEnv()
    this.app.set("port", process.env.PORT || 3000);
    this.server =  http.createServer(this.app);
    this.io = socket(this.server)
    this.connectDatabase();
    this.initializeMiddleWare();
    this.initializeSocketIO()
    this.initializeController(controller);
    this.initializeErrorHandling();
  }
  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private intialzieDotEnv(){
    dotenv.config({
      path: '.env'
    })
  }

  private initializeMiddleWare(){
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectDatabase(){
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    const db = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
    Connect({ db });
  }

  private initializeController(controllers : Controller[]){
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeSocketIO(){
  this.io.on('connection',(socket)=>{
    console.log("a user connected " + `${socket}`);
      socket.on("DataUser", (data: any) =>{
        socket.emit("respon" ,"OK")
      });
  });
        

      
  }
}
export default App
// const app : Application = express();


// app.set("port", process.env.PORT || 3000);
// const server = new http.Server(app);
// const io = socket(server)


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// dotenv.config({
//   path: '.env'
// });	
// io.on("connection", function(socket: any) {
//   console.log("a user connected " + `${socket}`);
//     // whenever we receive a 'message' we log it out
//     socket.on("message", function(message: any) {
//       console.log(message);
//       socket.emit("messageBalas" ,"OK")
//       io.emit("broadcast", "ini Broadcast")
//     });
// });




// app.get('/',(req:Request,res : Response ) => {
//   res.sendFile(path.resolve("./src/index.html"));
// })
// export default server;