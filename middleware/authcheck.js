const jwt=require('jsonwebtoken')
const Register=require('../models/userRegistration_model')

module.exports.verifyUser=function(req,res,next){
    try{
    const token=req.headers.authorization.split(" ")[1]
    const data=jwt.verify(token,'anysecretkey')
    Register.findOne({_id:data.userid}).then(function(userData){
        req.data=userData
        next()
    }).catch(function(ee){
        res.status(401).json({error:ee})
    })
    
    }
    catch(e){
    res.status(401).json({error:e})
    }
}