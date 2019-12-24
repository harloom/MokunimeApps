import App  from './app';
import  UserController from "./model/user/user.controller";
import dotenv from 'dotenv';




dotenv.config({
  path: '.env'
});	

const app = new App(
  [
    new UserController()
  ],
);


app.listen()