import { IGenre } from "../genre/genre.interfaces";
import { Document } from "mongoose";

interface Anime extends Document{
  title : String,
  description : String
  genre : IGenre,
  thumbail : String,
  background_thumbail : String,
  seasson : String,
  updateAt : Date
}
export default Anime;
