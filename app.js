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
const connectDB=require('./database/db')

const userRegistration_route=require('./routes/userRegistration_route');
const roomroutess=require('./routes/roomroutess')
const watchlistroutes=require('./routes/watchlistRoute')



const app=express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({urlencoded:true}))


app.use(fileupload());

app.use(express.static(path.join(__dirname, "public")));
//app.use(fileupload());

app.use(userRegistration_route)
app.use(roomroutess)
app.use(watchlistroutes)


app.listen(3000)

