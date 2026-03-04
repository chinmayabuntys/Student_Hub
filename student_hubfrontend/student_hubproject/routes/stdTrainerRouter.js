const express = require('express');
const { handleSignup, handleLogin,getTrainerDetails } = require('../controllers/trainerController');
const isAuth = require('../auth/auth');
    

const trainerrouter = express.Router();

trainerrouter.post('/signup', handleSignup);
trainerrouter.post('/login', handleLogin);
trainerrouter.get('/details',isAuth,getTrainerDetails);
module.exports = trainerrouter;

