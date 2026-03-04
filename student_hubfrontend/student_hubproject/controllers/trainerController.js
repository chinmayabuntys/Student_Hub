const trainerModel=require('../models/trainerModel');
const stdModel=require('../models/stdModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const handleSignup=async(req,res)=>{
    const{name,email,password,age}=req.body;

    if(!name ||!email ||!password ||!age){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    if(process.env.TRAINER_SECRET_CODE !== req.body.trainercode){
        return res.status(400).json({
            message:"Invalid secret code"
        })
    }
    try {
        const trainer=await trainerModel.findOne({email});
        if(trainer){
            return res.status(400).json({
                message:"Trainer already exists"
            })
        }
        const hashedPass=await bcrypt.hash(password,10);
        await trainerModel.insertOne({name,email,password:hashedPass,age,role:'trainer'});
        
        return res.status(201).json({
            message:"Trainer registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

const handleLogin=async(req,res)=>{
    const{email,password}=req.body;

    if(!email ||!password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
          const isTrainer=await trainerModel.findOne({email});
          if(!isTrainer){
            return res.status(400).json({
                message:"User not found"
            })
          }
          const isMatched=await bcrypt.compare(password,isTrainer.password);
          if(!isMatched){
            return res.status(400).json({
                message:"Invalid password"
            })
          }
          const token=jwt.sign({id:isTrainer._id,email:isTrainer.email,role:isTrainer.role},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
          return res.status(200).json({
            message:"Login successful",
            token
          })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

const getTrainerDetails=async(req,res)=>{
    try {
        const {id}=req.payload;
        const trainer=await trainerModel.findOne({_id:id});
        if(!trainer){
            return res.status(400).json({
                message:"Trainer not found"
            })
        }
        return res.status(200).json({
            trainer
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
const getAllStudents=async(req,res)=>{
    try {
        const students=await stdModel.find({},{password:0});
        return res.status(200).json({
            students
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
module.exports={handleSignup,handleLogin,getTrainerDetails,getAllStudents};