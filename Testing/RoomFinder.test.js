// use the path of your model
const Room=require('../models/roomModel')
const Register=require('../models/userRegistration_model')
const mongoose=require('mongoose');
const Watchlist = require('../models/watchlistmodel');
// use the new name of the database
const url = 'mongodb://localhost:27017/newdb';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});

describe('Testing Schema test anything', () => {

//--------------------------REGISTER Testing-----------------
 it('Add user testing anything', () => {
 const register = {
 'email': 'raisudip05@gmail.com',
 'password': 'jesuschrist',
 'fullname': 'jesuschrist',
 'phone': 'jesuschrist'
 }; 
 return Register.create(register)
 .then((pro_ret) => {
 expect(pro_ret.fullname).toEqual('jesuschrist');
 });
 });


  

//--------------------------Login Testing-----------------
    it('Login testing anything', () => {
    const login = {
    'email': 'raisudip05@gmail.com',
    'password': 'jesuschrist'
    };
    return Register.findOne(login)
    .then((pro_ret) => {
    expect(pro_ret.email).toEqual('raisudip05@gmail.com');
    });
    });



//--------------------------Add Post Testing-----------------
       it('Add post testing anything', () => {
       const addRoom = {
       'title': 'Flat in Kathmandu',
       'roomno': '4',
       'city': 'Kathmandu',
       'price': '40000',
       }; 
       return Room.create(addRoom)
       .then((pro_ret) => {
       expect(pro_ret.title).toEqual('Flat in Kathmandu');
       });
       });



//--------------------------Add Watchlist Testing-----------------
       it('Add watchlist testing anything', () => {
         const addRoom = {
                   'title': 'Flat in Kathmandu',
                   'roomno': '4',
                   'city': 'Kathmandu',
                   'price': '40000',
                   }; 
         const addWatchlist = {
         'room':addRoom,
         'userid':'1234ertyu'
         
         };
         
         return Watchlist.create(addWatchlist)
         .then((pro_ret) => {
         expect(pro_ret.room.title).toEqual('Flat in Kathmandu');
         });
         });


//--------------------------Edit Post Testing-----------------
it('to test the update', async () => {
   return Room.findOneAndUpdate({_id :Object('607e96c5f181ce23e8748c46')}, 
  {$set : {price:'38000'}})
   .then((pp)=>{
   expect(pp.price).toEqual('38000')
   })
   
  });



//--------------------------Edit Profile Testing-----------------
  it('to test the update', async () => {
   return Register.findOneAndUpdate({_id :Object('607dca11c549051d48f58754')}, 
  {$set : {fullname:'sudip'}})
   .then((pp)=>{
   expect(pp.fullname).toEqual('sudip')
   })
   
  });


//--------------------------Delete Post Testing-----------------
 it('to test the delete room is working or not', async () => {
 const status = await Room.deleteMany();
 expect(status.ok).toBe(1);
});



//--------------------------Delete watchist Testing-----------------
it('to test the delete watchlist is working or not', async () => {
   const status = await Watchlist.deleteMany();
   expect(status.ok).toBe(1);
  });
    
   })

   