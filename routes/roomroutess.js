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

//--------------------------Uploading post-----------------
router.post("/upload",authcheck.verifyUser, asyncHandler(async(req,res)=>{
    
  const room = await Room.create(req.body);
  if (!room) {
    return next(new ErrorResponse("Error adding room"), 404);
  }

  res.status(201).json({
    message: "success",
    data: room,
  });
 }))


 //--------------------------Updating Post with image file-----------------
 router.put("/upload/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{
    const room = await Room.findById(req.params.id);
    const id = req.params.id;
    const title=req.body.title
    const propertytype=req.body.propertytype
    const roomnumber=req.body.roomnumber
    const district=req.body.district
    const city=req.body.city
    const street=req.body.street
    const facility=req.body.facility
    const price=req.body.price
    const descrption=req.body.descrption
    const userID = req.body.userID;
    
    if (!room) {
      return next(new ErrorResponse(`No room found with ${req.params.id}`), 404);
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
        title:title,propertytype:propertytype,roomnumber:roomnumber,district:district,city:city,street:street,facility:facility,price:price,descrption:descrption,userID:userID
      });
    });        
    res.status(200).json({
      success: true,
      data: file.name,
    });   
 }));
 
     //-------------------------GET ALL ROOMS-----------------
 router.get("/room", asyncHandler(async (req, res, next) => {
  const rooms = await Room.find({});

  res.status(201).json({
    message: "success",
    count: rooms.length,
    data: rooms,
  });
}));

router.get("/room/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{
  const id=req.params.id
  const room = await Room.find({userID:id});
  
  if (!room) {
    return next(new ErrorResponse("Room not found"), 404);
  }

  res.status(200).json({
    message: "success",
    data: room,
  });
}))


//-------------------------GET ROOM BY ITS ID----------------
router.get("/getroom/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{
  const room = await Room.findById(req.params.id);
  
  if (!room) {
    return next(new ErrorResponse("Room not found"), 404);
  }

  res.status(200).json({
    message: "success",
    data: room,
  });
}))

//--------------------------GET ROOM BY ITS ID-----------------

router.get("/home/getroom/:id", asyncHandler(async(req,res,next)=>{
  const room = await Room.findById(req.params.id);
  
  if (!room) {
    return next(new ErrorResponse("Room not found"), 404);
  }

  res.status(200).json({
    message: "success",
    data: room,
  });
}))


//--------------------------DELETE ROOM -----------------
router.delete("/room/:id",authcheck.verifyUser, asyncHandler(async(req,res,next)=>{

  const room = await Room.findById(req.params.id);
  
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

//--------------------------UPDATE ROOM-----------------


router.put('/room/update/:id', function(req, res) {
  const id = req.params.id;
  const image=req.body.image
  const title=req.body.title
  const propertytype=req.body.propertytype
  const roomnumber=req.body.roomnumber
  const district=req.body.district
  const city=req.body.city
  const street=req.body.street
  const facility=req.body.facility
  const price=req.body.price
  const descrption=req.body.descrption
  const userID = req.body.userID;
  Room.updateOne({ _id: id }, {image:image,title:title,propertytype:propertytype,roomnumber:roomnumber,district:district,city:city,street:street,facility:facility,price:price,descrption:descrption,userID:userID})
      .then(function() {
          res.status(200).json({ message: "updated" })
      })
      .catch(function(e) {
          res.status(500).json({ error: e })
      })
})


//--------------------------GET ROOM BY CITY NAME-----------------
router.get("/related/room/:city", asyncHandler(async(req,res,next)=>{
  const city=req.params.city
  const room = await Room.find({city:city});
  
  if (!room) {
    return next(new ErrorResponse("Room not found"), 404);
  }

  res.status(200).json({
    message: "success",
    count: room.length,
    data: room,
  });
}))


//--------------------------GET ROOM BY PROPERTY TYPE-----------------
router.get("/filter/room/:property", asyncHandler(async(req,res,next)=>{
  const property=req.params.property
  const room = await Room.find({propertytype:property});
  
  if (!room) {
    return next(new ErrorResponse("Room not found"), 404);
  }

  res.status(200).json({
    message: "success",
    count: room.length,
    data: room,
  });
}))

module.exports=router