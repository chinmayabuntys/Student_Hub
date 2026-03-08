const express = require('express');
const { handleSignup, handleLogin,getTrainerDetails, getAllStudents } = require('../controllers/trainerController');
const isAuth = require('../auth/auth');
const authorized = require('../auth/authorized');
    

const trainerrouter = express.Router();

trainerrouter.post('/signup', handleSignup);
trainerrouter.post('/login', handleLogin);
trainerrouter.get('/details',isAuth,getTrainerDetails);
trainerrouter.get('/allstudents',isAuth,authorized,getAllStudents);
module.exports = trainerrouter;

