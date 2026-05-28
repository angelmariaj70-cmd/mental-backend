const express=require('express')
const jwtmiddleware = require('../middleware/jwtmiddleware')
const questionController=require('../controller/questionController')
const questionRoute=express.Router()
questionRoute.get('/api/getallquestions',jwtmiddleware,questionController.viewQuestion)
module.exports=questionRoute