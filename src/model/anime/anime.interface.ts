import { IGenre } from "../genre/genre.interfaces";

interface Anime{
  id : String,
  description : String
  genre : IGenre,
  thumbail : String,
  background_thumbail : String,
  seasson : String,
  updateAt : Date
}
export default Anime;