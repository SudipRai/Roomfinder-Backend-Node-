const express=require('express');
const router=express.Router();
const authcheck=require('../middleware/authcheck')
const Room=require('../models/roomModel')
const multer=require("multer")
const asyncHandler = require("../middleware/async");
const upload = require('../middleware/UploadFile');
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const fileupload = require('express-fileupload');


router.post("/upload",authcheck.verifyUser, asyncHandler(async(req,res)=>{
    
  const room = await Room.create(req.body);
  

  if (!room) {
    return next(new ErrorResponse("Error adding student"), 404);
  }

  res.status(201).json({
    message: "success",
    data: room,
  });
 }))






module.exports=router