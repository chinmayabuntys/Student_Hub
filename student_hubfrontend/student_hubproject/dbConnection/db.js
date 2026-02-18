const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/std_hub')
        console.log('MongoDB connected successfully');
    }catch(error){
        console.error('MongoDB connection error:',error);
    }
}
module.exports=connectDB;