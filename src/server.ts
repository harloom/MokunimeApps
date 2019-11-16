import App  from './app';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';



dotenv.config({
  path: '.env'
});	



const PORT = process.env.PORT || 3000;


App.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})