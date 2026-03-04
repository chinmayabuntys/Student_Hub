const authorized=(req,res,next)=>{
    const {role}=req.payload;
    if(role=='trainer'){
        next();
    }
    else{
        return res.status(403).json({message:"Forbidden: Access is denied"})
    }
}
module.exports=authorized;