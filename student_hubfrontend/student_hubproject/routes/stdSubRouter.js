const express=require('express');
const {handleAddSubject,handlegetAllSubjects,handleDeleteSubject}=require('../controllers/subjectController');
const isAuth=require('../auth/auth');

const stdSubRouter=express.Router();
stdSubRouter.post('/addSubject',isAuth,handleAddSubject);
stdSubRouter.get('/getAllSubjects',isAuth,handlegetAllSubjects);
stdSubRouter.delete('/deleteSubject/:id',isAuth,handleDeleteSubject);
module.exports=stdSubRouter;