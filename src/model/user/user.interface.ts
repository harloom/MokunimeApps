import monggose,{Document,Schema,Model,model} from "mongoose";

export  default interface User {
  _id: string;
  uid_firebase :String;
  name: string;
  email: string;
  pitcure : string;
  facebookToken? : string;
  socketToken? :string;
  androidToken? : string;
  createAt? : Date;
  updateAt? : Date;
}