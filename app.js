const mongoose=require('mongoose');
const express=require('express');
const colors = require("colors");
const path = require("path");
const cors=require('cors')
const dotenv = require("dotenv")
const fileupload = require("express-fileupload");


dotenv.config({
    path: "./database/config.env",
});
// Connect to mongoDB database
const connectDB=require('./database/db')

// Load routes files
const userRegistration_route=require('./routes/userRegistration_route');
const roomroutess=require('./routes/roomroutess')
const watchlistroutes=require('./routes/watchlistRoute')



const app=express();


//Body parser , which allows to receive body data from postman
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({limit: '50mb',urlencoded:true}))


//File upload
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use(userRegistration_route)
app.use(roomroutess)
app.use(watchlistroutes)


app.listen(3000)

