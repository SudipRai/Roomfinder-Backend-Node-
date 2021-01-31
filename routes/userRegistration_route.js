const express=require('express');
const router=express.Router();

const app=express();
const Register=require('../models/userRegistration_model')
const {check, validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

router.post("/register",[
    check('fullname',"Username is required").not().isEmpty(),
    check('address',"Address is required").not().isEmpty(),
    check('password',"Password is required").not().isEmpty(),
    check('email',"Address is required").isEmail()
], (req, res) => {
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const fullname=req.body.fullname
        const address=req.body.address
        const email=req.body.email
        const password=req.body.password
        bcryptjs.hash(password,10,function(err,hash){
            const myData = new Register({fullname:fullname,address:address,email:email,password:hash});
            myData.save().then(function(result){
                res.status(201).json({message:"Registered Sucess"});
                }).catch(function(err){
                res.status(500).json({message:"err"})
        })
        });
    }
    else{
        res.status(400).json(errors.array());
    }
});

router.get('/user/login',function(req,res){
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
            return res.status(200).json({message:"Success",token:token})
        })
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})
module.exports=router;