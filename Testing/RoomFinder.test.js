// use the path of your model
const Room=require('../models/roomModel')
const Register=require('../models/userRegistration_model')
const mongoose=require('mongoose');
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
describe('Product Schema test anything', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
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

 describe('Login Schema test anything', () => {
   // the code below is for insert testing
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
// // the code below is for delete testing
//  it('to test the delete product is working or not', async () => {
//  const status = await Product.deleteMany();
//  expect(status.ok).toBe(1);
// });
// it('to test the update', async () => {
//     return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')}, 
//    {$set : {pname:'ram'}})
//     .then((pp)=>{
//     expect(pp.pname).toEqual('ram')
//     })
    
//    });
    
   })
})
   