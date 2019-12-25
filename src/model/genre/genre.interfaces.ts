import { Document } from "mongoose";

export interface IGenre extends Document{
  id : String,
  title :String
}

export interface IGenres extends Array<IGenre>{}
