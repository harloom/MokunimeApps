import * as express from 'express';
import Controller from "../../interfaces/controller.interfaces";
import { request } from 'http';
import authMiddleware from '../../middleware/auth.middleware';
class GenreController implements Controller{
  
  public path = '/genre';
  public router =  express.Router();
  
  constructor(){
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.path,this.getAllGenre);
    this.router.get(`${this.path}/:id` ,this.getGenreById)
    this.router.all(`${this.path}/*`,authMiddleware)
    
  }
  
  
  private getAllGenre = async(request: express.Request,
    response : express.Response)=>{

    }

  private getGenreById = async(request: express.Request,
    response : express.Response)=>{

    }
}