import express from 'express';
import User from '../model/user/user.interface';

interface  RequestWithUser  extends express.Request {
  user?: User;
}

export default RequestWithUser;