const express=require('express');
const {handleAddSubject,handlegetAllSubjects,handleDeleteSubject,handleupdatesubject}=require('../controllers/subjectController');
const isAuth=require('../auth/auth');

const stdSubRouter=express.Router();
stdSubRouter.post('/addSubject',isAuth,handleAddSubject);
stdSubRouter.get('/getAllSubjects',isAuth,handlegetAllSubjects);
stdSubRouter.delete('/deleteSubject/:id',isAuth,handleDeleteSubject);
stdSubRouter.patch('/updateSubject',isAuth,handleupdatesubject);
module.exports=stdSubRouter;