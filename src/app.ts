import express,{ Application,Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({
  path: '.env'
});	

app.get('/',(req:Request,res : Response ) => {

    res.send('TS App is Running')
})

const PORT = process.env.PORT || 30000;


app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})