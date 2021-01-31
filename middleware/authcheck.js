const jwt=require('jsonwebtoken')
const Register=require('../models/userRegistration_model')

module.exports.verifyUser=function(req,res,next){
    try{
    const token=req.headers.authorization.split(" ")[1]
    const data=jwt.verify(token,'anysecretkey')
    Register.findOne({_id:data.userid}).then().catch()
    next()
    }
    catch(e){
    res.status().json()
    }
}