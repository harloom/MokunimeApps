import monggose,{Document,Schema,Model,model, HookNextFunction}from "mongoose";
import IAnime from './anime.interface'

const animeSchema  : Schema = new Schema(
  {
    title : {type : String , required : true},
    description : {type : String , required : true},
    genre: [{
      type : Schema.Types.ObjectId , ref:'genre'
    }],
    thumbail : {type  :  String ,required :true},
    background_thumbail : {type : String},
    seasson : {type: Schema.Types.ObjectId, ref : 'seasson'},
    crateAt : {type : Date , default: Date.now},
    updateAt : {type : Date}
  }
);

animeSchema.pre("save" , function(next : HookNextFunction){
  next();
});

animeSchema.pre("updateOne" , function(next : HookNextFunction){
  this.setQuery({updateAt : new Date()});
  next();
});

export default model<IAnime & Document>('anime', animeSchema);