const stdModel=require('../models/stdModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const handleSignup=async(req,res)=>{
    try {
        if(req.body==undefined){
            return res.status(400).json({message:'Details are required to create an account'})
        }
        const {name,email,password,age}=req.body;
        if(!name || !email || !password || !age){
            return res.status(400).json({message:'All fields are required'})
        }
        //check if user already exists
        const isUser= await stdModel.findOne({email});
        if(isUser){
            return res.status(409).json({message:'User already exists'})
        }
        //create new user
        const hashedPass=await bcrypt.hash(password,10);
        const newUser=await stdModel.insertOne({
            name,
            email,
            password:hashedPass,
            age
        })
        console.log('New user created:',newUser);
        return res.status(201).json({message:'User created successfully'})
    } catch (error) {
        return res.status(500).json({message:' Internal Server error'})
    }
}

const handleLogin=async(req,res)=>{
    try {
        if(req.body==undefined){
            return res.status(400).json({message:'Details are required to login an account'})
        }
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:'Email and password are required'})
        }
        //check if user exists
        const isUser= await stdModel.findOne({email});          
        if(!isUser){
            return res.status(400).json({message:'Invalid email '})
        }
        //match password
        const isMatch=await bcrypt.compare(password,isUser.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid password'})
        }
        //jwt token verify
        const token=jwt.sign({email,_id:isUser._id,role:isUser.role},'buntys',{expiresIn:'1h'})
        return res.status(200).json({message:'Login successful',token})
    } catch (error) {
        return res.status(500).json({message:' Internal Server error'})
    }
}

const getStdDetails=async(req,res)=>{
    try {
        const{_id}=req.payload;
        const isStd=await stdModel.findById({_id},{password:0});
        if(!isStd){
            return res.status(401).json({message:'token not valid because account deleted'})
        }
        return res.status(200).json({std:isStd})
    } catch (error) {
        return res.status(500).json({message:' Internal Server error'})
    }
}  

const updateStdname=async(req,res)=>{
    try {
        if(req.body==undefined){
            return res.status(400).json({message:'Details are required to login an account'})
        }
        const{_id}=req.payload;
        const{name}=req.body;
        const isStd=await stdModel.findById({_id},{password:0});
        if(!isStd){
            return res.status(401).json({message:'token not valid because account deleted'})
        }
        if(name == isStd.name){
            return res.status(400).json({message:'try with diffrent name'})
        }
        isStd.name=name;
        await isStd.save();
        return res.status(200).json({message:' Name Update successfully'})
    } catch (error) {
        return res.status(500).json({message:' Internal Server error'})
    }
}

const handleUpdatePassword=async(req,res)=>{
    try {
        const{_id}=req.payload;
        const isStd=await stdModel.findById({_id});
        if(!isStd){
            return res.status(401).json({message:'token not valid because account deleted'})
        }
        if(req.body==undefined){
            return res.status(400).json({message:'input fields are required'})
        }
        
        const{oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({message:'old password and new password are required'})
        }
        const isMatch=await bcrypt.compare(oldPassword,isStd.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid old password'})
        }
        if(oldPassword==newPassword){
            return res.status(400).json({message:' old and new password cannot be same provide diffrent password'})
        }
        const hashedPass=await bcrypt.hash(newPassword,10);
        isStd.password=hashedPass;
        await isStd.save();
        return res.status(200).json({message:'Password Update successfully'})

    } catch (error) {
        return res.status(500).json({message:' Internal Server error'})
    }
}

module.exports={handleSignup,handleLogin,getStdDetails,updateStdname,handleUpdatePassword};