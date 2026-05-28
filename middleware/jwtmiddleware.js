const jwt=require('jsonwebtoken')
const jwtmiddleware=(req,res,next)=>{
  console.log("inside jwt");
  try {
    const token=req.headers.authorization.slice(7)
    console.log(token);
    console.log(process.env.jwtKey);
    
    jwtverification=jwt.verify(token,process.env.jwtKey)
    console.log(jwtverification);
    req.payload=jwtverification.userMail
    console.log(req.payload);
    
    next()
    
  } catch (error) {
    res.status(401).json("Authorization error..")
  }
 
}
module.exports=jwtmiddleware