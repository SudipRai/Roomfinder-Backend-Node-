const express=require('express');
const router=express.Router();
const authcheck=require('../middleware/authcheck')

const app=express();
const Room=require('../models/roomModel')
const {check, validationResult}=require('express-validator');
const { route } = require('./userRegistration_route');

router.post('/room/insert',authcheck.verifyUser,function(req,res){
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

    const data=new Room({image:image,title:title,propertytype:propertytype,roomnumber:roomnumber,district:district,city:city,street:street,facility:facility,price:price,descrption:descrption})
    data.save().then(function(result){
        res.status(201).json({message:"Room Added"});

    }).catch(function(err){
        res.status(500).json({message:"err"}) 
    })
})

module.exports=router