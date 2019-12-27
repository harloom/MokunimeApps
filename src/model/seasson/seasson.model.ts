import monggose,{Document,Schema,Model,model, HookNextFunction}from "mongoose";
import { ISeason } from "./seasson.interface";

const seasonSchema  : Schema = new Schema(
  {
    title : {type : String , required : true},
    crateAt : {type : Date , default: Date.now},
    updateAt : {type : Date}
  }
);

seasonSchema.pre("save" , function(next : HookNextFunction){
  next();
});

seasonSchema.pre("updateOne" , function(next : HookNextFunction){
  this.setQuery({updateAt : new Date()});
  next();
});

export default model<ISeason>('seassons', seasonSchema);