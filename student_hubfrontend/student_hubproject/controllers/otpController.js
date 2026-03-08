const otpModel=require('../models/otpModel');
const stdModel = require('../models/stdModel');
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt');

const forgotPassword=async (req,res)=>{
    const{email}=req.body;
    const isUser=await stdModel.findOne({email});
    if(!isUser){
        return res.status(400).json({message:'Invalid email'})
    }

    const otp=Math.floor(100000+Math.random()*900000);
    await otpModel.insertOne({email,otp});

    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'chinmayaprasadgarnaik@gmail.com',
            pass:'az by cx dw 1234'
        }
    })
    await transporter.sendMail({
        from:'chinmayaprasadgarnaik@gmail.com',
        to:email,
        subject:'Password reset OTP',
        text:`Your OTP for password reset is ${otp}. It is valid for 5 minutes.`
    })
    return res.status(200).json({message:'OTP sent to email'})
}

const verifyOtp=async(req,res)=>{
    const{email,otp}=req.body;
    const isValid=await otpModel.findOne({email,otp});
    if(!isValid){
        return res.status(400).json({message:'Invalid OTP'})
    }
    return res.status(200).json({message:'OTP verified'})
}

const resetPassword=async(req,res)=>{
    const{email,newPassword}=req.body;
    const hashedPass=await bcrypt.hash(newPassword,10);
    await stdModel.updateOne({email},{$set:{password:hashedPass}});
    return res.status(200).json({message:'Password reset successful'})
}

module.exports={forgotPassword,verifyOtp,resetPassword}
    