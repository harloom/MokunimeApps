import { IsString } from "class-validator";

//handle request
class CreateSeasson{
  @IsString()
  public title: string | undefined;
  
}
export default CreateSeasson;