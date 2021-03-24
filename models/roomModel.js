const mongoose=require('mongoose');


const Room=mongoose.model('Room',{
    image:{
        type:String,
        default:"no-photo.jpg",
    },
    title:{
        type:String,
    },
    propertytype:{
        type:String,
    },
    roomnumber:{
        type:String,
    },
    district:{
        type:String,
    },
    city:{
        type:String,
    },
    street:{
        type:String,
    },
    facility:{
        type:String,
    },
    price:{
        type:String,
    },
    descrption:{
        type:String,
    },
    userID:{
        type:String,
    }
   
})
module.exports=Room;