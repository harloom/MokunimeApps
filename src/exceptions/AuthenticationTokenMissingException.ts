import HttpException from './HttpException';

export default class AuthenticationTokenMissingException extends HttpException{
  constructor(){
    /* menggunakan consutor parrent */
    super(401,"Authentication token missing")
  }

}