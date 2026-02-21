const { mongo } = require('mongoose');
const subjectModel=require('../models/subjectModel');
const handleAddSubject = async (req, res) => {
  try {
    const { _id } = req.payload;
    const { subject } = req.body;

    // validation
    if (!subject || subject.trim() === "") {
      return res.status(400).json({
        message: "Subject is required",
      });
    }

    // duplicate check (optimized)
    const existing = await subjectModel.findOne({
      stdId: _id,
      subject: subject.trim().toLowerCase(),
    });

    if (existing) {
      return res.status(400).json({
        message: "You already added this subject",
      });
    }

    // create subject
    await subjectModel.insertOne({
      subject: subject.trim().toLowerCase(),
      stdId: _id,
    });

    return res.status(201).json({
      message: `${subject} added successfully`,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const handlegetAllSubjects = async (req, res) => {
  try {
    const { _id } = req.payload;   // ⭐ take from JWT payload

    const allsubjects = await subjectModel.find({ stdId: _id });

    return res.status(200).json({
      subjects: allsubjects,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const handleDeleteSubject=async(req,res)=>{
    const{id}=req.params;
    const{_id}=req.payload;
    if(!id){
        return res.status(400).json({message:'Subject id is required'})
    }
    if(!mongo.ObjectId.isValid(id)){
        return res.status(400).json({message:'Invalid subject id'})
    }
    const deleted=await subjectModel.findOneAndDelete({_id:id,stdId:_id});
    if(!deleted){
        return res.status(404).json({message:'Subject not found'})
    }
    return res.status(200).json({message:'Subject deleted successfully'})
}
module.exports={handleAddSubject,handlegetAllSubjects,handleDeleteSubject}