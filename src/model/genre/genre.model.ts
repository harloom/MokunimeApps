import monggose,{Document,Schema,Model,model, HookNextFunction}from "mongoose";
import {IGenre,IGenres} from './genre.interfaces'

const genreSchema  : Schema = new Schema(
  {
    title : {type : String , required : true},
    crateAt : {type : Date , default: Date.now},
    updateAt : {type : Date ,default: Date.now}
  }
);

genreSchema.pre("save" , function(next : HookNextFunction){
  next();
});

genreSchema.pre("updateOne" , function(next : HookNextFunction){
  this.setQuery({updateAt : new Date()});
  next();
});

export default model<IGenre>('anime', genreSchema);