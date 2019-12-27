import *as express from "express";
import model from './seasson.model'
import CreateSeasson from "./seasson.dto";
import HttpStatus from "http-status-codes";
import { validationMiddleware, validationParamsId } from "../../middleware/validation.middleware";
import { ISeason } from "./seasson.interface";
export default class SeassonController {

  public path = '/seasson';
  public router = express.Router();
  private seasson = model
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllSeasson);
    this.router.get(`${this.path}/:id`, validationParamsId, this.getSeassonById)
    this.router.all(`${this.path}`)
      .post(`${this.path}`,
        validationMiddleware(CreateSeasson), this.createSeasson)
      .patch(`${this.path}/:id`,
        [validationParamsId, 
        validationMiddleware(CreateSeasson, true)],
        this.modifySeasson)
      .delete(`${this.path}/:id`, validationParamsId, this.deleteSeasson)
  }

private getAllSeasson = async(request: express.Request,
response: express.Response) => {
  const genres = await this.seasson.find();
  response.status(HttpStatus.OK);
}

private getSeassonById = async(request: express.Request,
response: express.Response) => {
  const id = request.params.id;
  const seasson = await this.seasson.findById(id);
  if(seasson){
    return response.send(seasson);
  }

  return response.sendStatus(HttpStatus.NOT_FOUND)
}

private createSeasson = async(request: express.Request,
response: express.Response) => {
  const postData : CreateSeasson = request.body;
  const createSeasson = new this.seasson({
    ...postData //cloneObject
  });
  const save = await createSeasson.save().catch((e :any)=>{
    return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  return response.status(HttpStatus.CREATED).json({
    status : "Create"
  });
}

private modifySeasson = async(request: express.Request,
response: express.Response) => {
  const id = request.params.id;
    const postData: ISeason = request.body;
    const seasson = await this.seasson.findByIdAndUpdate(id, postData, { new: true });
    if (seasson) {
      return response.send(seasson);
    }
    return response.sendStatus(HttpStatus.NOT_FOUND)

}

private deleteSeasson = async(request: express.Request,
response: express.Response) => {
  const id = request.params.id;
  const success = await this.seasson.findByIdAndDelete(id);
  if(success){
    response.sendStatus(HttpStatus.OK);
  }else{
    response.sendStatus(HttpStatus.NOT_FOUND);
  }
}

}
