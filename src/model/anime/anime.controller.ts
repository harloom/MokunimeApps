import { validationMiddleware, validationParamsId } from "../../middleware/validation.middleware";
import CreateAnimeDto from './anime.dto';
import express ,{ Router } from "express";
import animeModel from './anime.model'
;
class AnimeController {
  constructor() {
    this.initializeRoutes();
  }

  public path = '/anime';
  public router =Router();
  private seasson = animeModel;
  
  private initializeRoutes() {
  this.router.get(this.path, this.getAllanime);
  this.router.get(`${this.path}/:id`, validationParamsId,this.getanimeById)
  this.router.all(`${this.path}`)
  .post(`${this.path}`,
  validationMiddleware(CreateAnimeDto), this.createanime)
  .patch(`${this.path}/:id`,[validationParamsId ,validationMiddleware(CreateAnimeDto, true)], this.modifyanime)
  .delete(`${this.path}/:id`,validationParamsId, this.deleteanime)
  }
  
  
  private getAllanime = async(request: express.Request,
  response: express.Response) => {
  
  }
  
  private getanimeById = async(request: express.Request,
  response: express.Response) => {
  
  }
  
  private createanime = async(request: express.Request,
  response: express.Response) => {
  
  }
  
  private modifyanime = async(request: express.Request,
  response: express.Response) => {
  
  }
  
  private deleteanime = async(request: express.Request,
  response: express.Response) => {
  
  }
  
}