const dotenv = require('dotenv');
const express = require('express');
const app = express()

//setting .env
dotenv.config({
    path: '.env'
});
const port  = process.env.PORT || 3000
const server  = app.listen(port,
    () => console.log(`Server Is now Runnnin in ${process.env.NODE_ENV} on Port ${process.env.PORT}`))
const apps = require('./app')(app,server);
