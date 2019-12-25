import monggose,{Document,Schema,Model,model, HookNextFunction}from "mongoose";
import IUser from './user.interface'

const userSchema : Schema= new Schema({
  uid_firebase :{type : String , required: true},
  name: {type : String , required: true},
  email: {type : String , required: true},
  pitcure : String,
  facebookToken : String,
  socketToken :String,
  androidToken : String,
  createAt : {type : Date , default : Date.now},
  updateAt : {type : Date}
  
});

userSchema.pre("save" , function(next : monggose.HookNextFunction){
  next();
});

userSchema.pre("updateOne", function(next : HookNextFunction){
  this.setQuery({ updateAt: new Date() });
  next();

});

export default model<IUser  & Document>('user',userSchema);