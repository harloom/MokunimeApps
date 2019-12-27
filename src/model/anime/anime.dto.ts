
import { IsString, IsArray, MaxLength, MinLength, IsUrl, IsFQDN } from "class-validator";

//handle request
class CreateAnimeDto{
  @IsString()
  public title: string | undefined;

  @IsString()
  public description : string |undefined;
  
  @MinLength(1,{
    each:true
  })
  public genre : string[] | undefined 

  @IsUrl()
  public thumbail : string | undefined
  
  @IsUrl()
  public background_thumbail : string |undefined

  @IsString()
  public seasson : string | undefined
}
export default CreateSeasson;