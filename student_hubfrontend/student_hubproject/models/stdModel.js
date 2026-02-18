const mongoose=require('mongoose');
const stdSchema=new mongoose.Schema({
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
        required:true,
        default:18              
    },
    role:{
        type:String,
        default:'student'
    }
})
const stdModel=mongoose.model('student',stdSchema);
module.exports=stdModel;