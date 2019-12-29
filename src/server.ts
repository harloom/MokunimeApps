import App  from './app';
import  UserController from "./model/user/user.controller";
import dotenv from 'dotenv';
import GenreController from './model/genre/genre.controller';




dotenv.config({
  path: '.env'
});	

const app = new App(
  [
    new UserController(),
    new GenreController()
  ],
);


app.listen()