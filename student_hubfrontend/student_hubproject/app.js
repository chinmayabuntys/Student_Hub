const express=require('express');
const cors=require('cors')
const{configDotenv}=require('dotenv');
const connectDB=require('./dbConnection/db');
const stdRoute=require('./routes/stdRouter');

connectDB();
const app=express();
app.use(cors())
configDotenv();
app.use(express.json());
console.log('PORT =',process.env.PORT);


//server testing api
app.get('/',(req,res)=>{
     return res.json({message:'server is running'});
})  


//api for std router

app.use('/api/std',stdRoute)
app.listen( 3000, 'localhost',()=>{
    console.log('server started at http://localhost:3000')
})