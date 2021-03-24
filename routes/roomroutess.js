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






 router.put("/upload/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{
    const room = await Room.findById(req.params.id);
    const id=req.params.id
    
    if (!room) {
      return next(new ErrorResponse(`No student found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${room.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async (err)=> {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
      await Room.findByIdAndUpdate(req.params.id, {
        image: file.name,
      });
    });
        
    res.status(200).json({
      success: true,
      data: file.name,
    });
    
   
  
 }));
 
     



module.exports=router