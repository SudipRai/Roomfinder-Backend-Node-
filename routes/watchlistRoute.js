const express=require('express');
const router=express.Router();
const authcheck=require('../middleware/authcheck')
const Room=require('../models/roomModel')
const Watchlist=require('../models/watchlistmodel')
const multer=require("multer")
const asyncHandler = require("../middleware/async");
const upload = require('../middleware/UploadFile');
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const fileupload = require('express-fileupload');

//--------------------------CREATE WATCHLIST-----------------
router.post("/watchlist",authcheck.verifyUser, asyncHandler(async(req,res)=>{
    
  const room = await Watchlist.create(req.body);
  

  if (!room) {
    return next(new ErrorResponse("Error adding watchlist"), 404);
  }

  res.status(201).json({
    message: "success",
    data: room,
  });
 }))

 //--------------------------SHOW WATCHLIST-----------------

 router.get("/watchlist/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    const room = await Watchlist.find({userid:id});
    
    if (!room) {
      return next(new ErrorResponse("No watchlist"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: room,
    });
  }))

  //--------------------------DELETE WATCHLIST-----------------

  router.delete("/watchlist/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{

    const room = await Watchlist.findById(req.params.id);
    
      if (!room) {
        return next(new ErrorResponse(`No post found `), 404);
      }
    
      await room.remove();
    
      res.status(200).json({
        message: "success",
        count: room.length,
        data: {},
      });
  }))
 module.exports=router