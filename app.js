const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const socket = require('socket.io');

module.exports = (app,server)=>{

  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  



  var io = socket(server);
  // const publicPath = (path.join(__dirname,"/src/public/"));

  // Static files

  // app.use(express.static(publicPath));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  
//database


// mongoose.connect(`mongodb+srv://admin:bandarlampung@c-jarimanis-nlthx.mongodb.net/db_jarimanis?retryWrites=true&w=majority`, {
//       useNewUrlParser: true,
//       useFindAndModify: false
//   })
//   .then(() => {
  
//       console.log('Connected to Database...')

//   }).catch(err => {
//       console.error("Error " + err)
//   });





//MidleWare
app.use(function (req, res, next) {
  res.io = io;
  next();

});





//routes



//handle Error

app.use((req,res,next)=>{
  let error = new Error('Not Found');
  // console.log(error)
  // error.status(404);
  next(error)

});

app.use((error,req,res,next)=>{
  // console.log(error)
  res.status(404);
  res.json({
      error : {
          message : error.toString()
      }
  });
});
};