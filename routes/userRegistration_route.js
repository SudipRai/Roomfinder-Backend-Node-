const express=require('express');
const router=express.Router();


const app=express();
const authcheck=require('../middleware/authcheck')
const Register=require('../models/userRegistration_model')
const {check, validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const jwt=require('jsonwebtoken')

//--------------------------REGISTER USER-----------------
router.post("/register",[
   
    check('fullname',"Username is required").not().isEmpty(),
    check('phone',"Phone is required").not().isEmpty(),
    check('password',"Password is required").not().isEmpty(),
    check('email',"Email is required").isEmail()
], (req, res) => {
    
    const errors=validationResult(req);
    if(errors.isEmpty()){
        console.log("requested")
        const fullname=req.body.fullname
        const phone=req.body.phone
        const email=req.body.email
        
        const password=req.body.password
        bcryptjs.hash(password,10,function(err,hash){
            const myData = new Register({fullname:fullname,phone:phone,email:email,password:hash});
            myData.save().then(function(result){
                res.status(201).json({
                   message:"success",
                   data : result
                });
        }).catch(function(err){
            res.status(500).json({message:"err"}) 
        })
    })
}
        
    else{
        res.status(400).json(errors.array());
    }
});

//--------------------------LOGIN-----------------

router.post('/login',function(req,res){
    console.log("requested")
    const email=req.body.email
    const password=req.body.password
    Register.findOne({email:email})
    .then(function(data){
        if(data===null){
            return res.status(401).json({message:"Invalid"})
        }
        bcryptjs.compare(password,data.password,function(err,result){
            if(result===false){
                return res.status(401).json({message:"Invalid"})
            }
            
            const token=jwt.sign({userid:data._id},'anysecretkey')
            return res.status(200).json({message:"success",token:token,user:data._id})
        })
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

//--------------------------GET CURRENT USER-----------------

router.get('/user/:id',authcheck.verifyUser, asyncHandler(async(req,res)=>{

    const user = await Register.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorResponse("User not found"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: user,
    });
}))


//--------------------------GET THE DETAILS OF OWNER BY POST(ROOM)-----------------

router.get('/home/owner/:id', asyncHandler(async(req,res)=>{

    const user = await Register.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorResponse("User not found"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: user,
    });
}))

//--------------------------PROFILE UPDATE-----------------
router.put('/profile/update/:id', function(req, res) {
    const id = req.params.id;
    const fullname=req.body.fullname
    const email=req.body.email
    const phone=req.body.phone
    const password=req.body.password
    Register.updateOne({ _id: id }, {fullname:fullname,email:email,phone:phone})
        .then(function() {
            res.status(200).json({ message: "updated" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
  })


module.exports=router;