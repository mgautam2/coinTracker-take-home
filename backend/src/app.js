const express = require("express");
const path = require('path');


const app = express(); 


app.use(express.json())

app.use(express.urlencoded({
  extended:true
})); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
  });
  

app.use('/', require('./Routes'));

module.exports = app;