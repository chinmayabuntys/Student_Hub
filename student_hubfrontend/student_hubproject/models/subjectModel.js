const mongoose = require('mongoose');

const subjectSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    stdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'std',
        required:true
    }
})
const subjectModel=mongoose.model('subject',subjectSchema);
module.exports=subjectModel;