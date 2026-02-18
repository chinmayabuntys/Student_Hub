const jwt=require('jsonwebtoken')
const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(' ')[1];
        console.log('Token:', token);
        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }
        const payload=jwt.verify(token,'buntys');
        req.payload=payload;
        next();
    } catch (error) {
        return res.status(400).json({message:'invalid or expired'})
    }
}
module.exports=isAuth;