import { IsString } from "class-validator";

//handle request
class CreateGenreDto{
  @IsString()
  public title: string | undefined;
  
}
export default CreateGenreDto;