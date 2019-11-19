import express,{ Response,Request,NextFunction} from "express";
import authMiddleware from '../../middleware/auth.middleware';
import RequestWithUser from '../../interfaces/requestWithUser.interface'
import  Controller from "../../interfaces/controller.interfaces";
class UserController implements Controller {

  /* declarasi */
  public path   = '/user'
  public router =  express.Router()
  /*  */
  constructor(){
    this.initializeRoutes()
  }

  private initializeRoutes(){
    /* example 
        this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    
    */

    this.router.get(`${this.path}/:id`,authMiddleware,this.getUser);
  }
  private getUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const userId = request.params.id;
    if (userId === request.user._id.toString()) {
      response.send('ok');
    }
    next(new Error());
  }

}

export default UserController