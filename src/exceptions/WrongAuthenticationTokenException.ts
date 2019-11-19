import HttpException from './HttpException';

export default class WrongAuthenticationTokenException extends HttpException{
  constructor(){
    /* menggunakan consutor parrent */
    super(401, 'Wrong authentication token');
  }

}