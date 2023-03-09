const express = require('express');
const router = express.Router();

const { getQuestions,insertQuestions, dropQuestions, getResult,storeResult,dropResult} = require('../controllers/controller');

router.route('/questions')
        .get(getQuestions) 
        .post(insertQuestions) 
        .delete(dropQuestions) 

router.route('/result')
        .get(getResult)
        .post(storeResult)
        .delete(dropResult)



module.exports = router;
