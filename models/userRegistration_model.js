const mongoose=require('mongoose');
const Register=mongoose.model('Register',{
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  
})
module.exports=Register;