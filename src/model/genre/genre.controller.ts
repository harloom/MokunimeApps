import * as express from 'express';
import Controller from "../../interfaces/controller.interfaces";
import { request } from 'http';
import authMiddleware from '../../middleware/auth.middleware';
import {validationMiddleware, validationParamsId} from '../../middleware/validation.middleware';
import CreateGenreDto from './genre.dto';
import * as HttpStatus from 'http-status-codes'
import model from "./genre.model";
import { IGenre } from './genre.interfaces';

class GenreController implements Controller {

  public path = '/genre';
  public router = express.Router();
  private genre = model



  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.path, this.getAllGenre);
    this.router.get(`${this.path}/:id`, validationParamsId,this.getGenreById)
    this.router.all(`${this.path}/*`)
      .post(`${this.path}`,
        validationMiddleware(CreateGenreDto), this.createGenre)
      .patch(`${this.path}/:id`,[validationParamsId ,validationMiddleware(CreateGenreDto, true)], this.modifyGenre)
      .delete(`${this.path}/:id`,validationParamsId, this.deleteGenre)

  }


  private deleteGenre = async (request: express.Request,
    response: express.Response ,next : express.NextFunction) => {
      console.log('Delete Genre');
      const id = request.params.id;
      const success = await this.genre.findByIdAndDelete(id);
      if(success){
        response.sendStatus(HttpStatus.OK);
      }else{
        response.sendStatus(HttpStatus.NOT_FOUND);
      }
      
  }

  private createGenre = async (request: express.Request
    , response: express.Response) => {
      console.log('Create Genre');
        const postData  : CreateGenreDto = request.body;
        const createGenre = new this.genre({
          ...postData
        })
        const save = await createGenre.save().catch((e : any) =>{
          console.log(e);
        });
    
      response.status(HttpStatus.CREATED).json({status : "Create",data:save});
  }

  private modifyGenre = async (request: express.Request
    , response: express.Response) => {
        console.log('Modify Genre');
        const id = request.params.id;
    const postData: IGenre = request.body;
    const genre = await this.genre.findByIdAndUpdate(id, postData, { new: true });
    if (genre) {
      return response.send(genre);
    }
    return response.sendStatus(HttpStatus.NOT_FOUND)
  }

  private getAllGenre = async (request: express.Request,
    response: express.Response) => {
      console.log('-----------------------------');
      console.log('Get All');
      const genres = await this.genre.find();
      response.status(HttpStatus.OK).json(genres);

  }

  private getGenreById = async (request: express.Request,
    response: express.Response) => {
      console.log('-----------------------------');
      console.log('geGenre By Id');
      const id = request.params.id;
      const genre = await this.genre.findById(id)
      if(genre){
        return response.send(genre)
      }

      return response.sendStatus(404);
  }
}

export default GenreController;