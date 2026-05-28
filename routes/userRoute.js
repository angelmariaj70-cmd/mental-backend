const express=require('express')
const route=express.Router()
const userController=require('../controller/userController')
const uploader=require('../middleware/multerMiddleware')
const middleware=require('../middleware/adminMiddleware')
route.post('/api/register',userController.registerLogic)
route.post('/api/login',userController.login)
route.post('/api/googlelogin',userController.googleloginUser)
route.get("/api/users",middleware,userController. getAllUsers);
route.put(
  "/api/admin/:id", 
  middleware,
  uploader.single("profile"),
  userController.updateAdminProfile
)
module.exports=route