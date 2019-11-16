import App  from './app';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Connect from './db/monggose-db';



dotenv.config({
  path: '.env'
});	

// const db = 'mongodb://mongo:27017/test';
// Connect({ db });


const PORT = process.env.PORT || 3000;


App.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})