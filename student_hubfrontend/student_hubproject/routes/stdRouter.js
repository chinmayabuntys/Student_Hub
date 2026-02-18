const express=require('express');
const { handleSignup,handleLogin, getStdDetails, updateStdname, handleUpdatePassword } = require('../controllers/stdController');
const isAuth = require('../auth/auth');
const stdRoute=express.Router();
stdRoute.get('/',(req,res)=>{
    return res.json({message:'std route run'})
});

stdRoute.post('/signup',handleSignup);
stdRoute.post('/login',handleLogin);
stdRoute.get('/get',isAuth,getStdDetails);
stdRoute.patch('/updatename',isAuth,updateStdname);
stdRoute.patch('/updatepassword',isAuth,handleUpdatePassword)
module.exports=stdRoute;

