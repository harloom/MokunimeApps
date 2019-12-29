
import * as express from 'express';
import RequestWithUser from '../../interfaces/requestWithUser.interface'
import authMiddleware from '../../middleware/auth.middleware';
import Controller from "../../interfaces/controller.interfaces";
class UserController implements Controller {

  /* declarasi */
  public path   = '/users'
  public router =  express.Router()
  /*  */
  constructor(){
    this.initializeRoutes()
  }

  private initializeRoutes(){
    /* example 
        this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    
    */

    this.router.get(`${this.path}/:id`,authMiddleware,this.getUser)
  }
  private getUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const userId = request.params.id;
    if(request.user){
      if (userId === request.user.id.toString()) {
        response.send('ok');
      }
    }

    next(new Error());
  }

}

export default UserController