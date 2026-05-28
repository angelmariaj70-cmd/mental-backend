const express=require('express')
const jwtmiddleware = require('../middleware/jwtmiddleware')
const adminJwt=require('../middleware/adminMiddleware')
const doctorJwt=require('../middleware/doctorMiddleware')
const doctorController=require('../controller/doctorController')
const upload=require('../middleware/multerMiddleware')
const doctorRouter=express.Router()
doctorRouter.get('/api/getallDoctors',jwtmiddleware,doctorController.viewDoctor)
doctorRouter.get('/api/getaDoctor/:id',jwtmiddleware,doctorController.viewSingleDoctor)
doctorRouter.put('/api/makepayment/:id',jwtmiddleware,doctorController.makePayment)
doctorRouter.get('/api/getBooked',doctorJwt,doctorController.getAllBookings)

doctorRouter.get('/api/full',doctorJwt,doctorController.findAllDoctors)
doctorRouter.get('/api/alldoctors',adminJwt,doctorController.viewDoctor)
doctorRouter.put(
  "/api/updateProfile/:id", 
  doctorJwt,
  upload.single("profile"),
  doctorController.updateDoctorProfile
)
  doctorRouter.delete(
  "/api/rejectdoctor/:id", 
  adminJwt,
 
  doctorController.deleteADoctor
)
doctorRouter.put(
  "/api/approvedoctor/:id",
  adminJwt,
  doctorController.approveDoctor
)
doctorRouter.get('/api/intro',doctorController.homeDoctor)
 
  

module.exports=doctorRouter