

interface User {
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
export  default User