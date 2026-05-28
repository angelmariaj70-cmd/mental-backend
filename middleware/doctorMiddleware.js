const jwt = require('jsonwebtoken')

const doctorJwtMiddleware = (req,res,next)=>{
    console.log("inside doctorJwtMiddleware");
    // const token = req.headers.authorization.split(" ")[1]
    // console.log(token);
    try{
         const token = req.headers.authorization.slice(7)
    console.log(token);
        const jwtverification = jwt.verify(token,process.env.jwtKey)
        console.log(jwtverification);
        req.payload = jwtverification.userMail
        // req.role = jwtverification.role
        if(jwtverification.userMail=="doctor@gmail.com"){
            next()
        }else{
            res.status(401).json("Unauthorised user!!!")
        }
    }catch(err){
        res.status(401).json("Invalid Token",err)
    }
}

module.exports = doctorJwtMiddleware