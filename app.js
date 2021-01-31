const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser')

const db=require('./database/db')
const userRegistration_route=require('./routes/userRegistration_route');
const roomRoute=require('./routes/roomRoute')

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(userRegistration_route)
app.use(roomRoute)

  
app.listen(90)