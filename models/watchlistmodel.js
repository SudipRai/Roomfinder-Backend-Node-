const mongoose=require('mongoose');
const {Room}=require('./roomModel')
const Watchlist=mongoose.model('Watchlist',{
    userid:{
        type:String
    },
    room:{
        type:{Room},
        
    }
  
})
module.exports=Watchlist;