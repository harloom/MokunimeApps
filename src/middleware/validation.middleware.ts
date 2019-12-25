import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import monggose from 'mongoose';

export function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}

export function validationParamsId(req : express.Request,res:express.Response,next:express.NextFunction){
    console.log(`valid params`);
    if(!monggose.Types.ObjectId.isValid(req.params.id)){
      console.log('invalid');
      
      const message = "Param id not support"
      next(new HttpException(400,message));
    }else{
      console.log(`valid`);
      next();
    }


}
