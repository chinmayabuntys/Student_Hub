const mongoose=require('mongoose');

const trainerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"trainer"
    }
})
const trainerModel=mongoose.model('trainer',trainerSchema);

module.exports=trainerModel;