const users=require('../model/userModel')
const jwt=require('jsonwebtoken')
exports.registerLogic=async(req,res)=>{
  const {username,email,password}=req.body
  console.log("Inside register logic",req.body);
  try {
    const existingUer=await users.findOne({email})
    if (existingUer) {
      res.status(401).json({message:"user already existing"})
    }
    else{
      const newUser=new users({username,email,password})
      await newUser.save()
      res.status(201).json({message:"New users details successully added",newUser})
    }
  } catch (error) {
    res.status(501).json({message:"Internal server eror"+error})
  }
}
 exports.login=async(req,res)=>{
  const {email,password}=req.body
  console.log("Inside login function",req.body);
  try {
    const existingUser=await users.findOne({email})
    if (existingUser) {
      if (existingUser.password===password) {
        const token=jwt.sign({userMail:existingUser.email,userId:existingUser._id},process.env.jwtKey)
    console.log(token);
        res.status(200).json({message:"Login successfull",existingUser,token})
      }
      else{
        res.status(401).json({message:"Password mismatch"})
      }
     console.log("DB Password:", existingUser.password)
console.log("Entered Password:", password)
    }
     else{
        res.status(401).json({message:"User not found,please register"})
      }
  } catch (error) {
    res.status(500).json({message:"Server error",error})
  }

 }
 exports.googleloginUser=async(req,res)=>{
  console.log("Inside login function",req.body);
  const {email,password,username,profile}=req.body
  try{
    const existingUser=await users.findOne({email})
  if(existingUser){
    const token=jwt.sign({userMail:existingUser.email,userId:existingUser._id},process.env.jwtKey)
    console.log(token);
   
      res.status(200).json({message:"Login successfull",existingUser,token})
    }
    else{
     const newUser=new users({email,password,username,profile})
     await newUser.save()
    res.status(201).json({message:"User saved successfully..",newUser})
  }
 
   
  }
  catch(err){
    res.status(500).json({message:"server err",err})
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json({message:"All user details are successuflly fetched ",allUsers});
  } catch (err) {
    res.status(500).json(err);
  }
};
//admin profile updation
exports.updateAdminProfile = async (req, res) => {
  console.log("Inside updation of the admin");

  try {

    const { id } = req.params;

    const { username, email, password } = req.body;

    const updatedAdmin = await users.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,

        ...(req.file && { profile: req.file.filename })
      },
      { new: true }
    );

    res.status(200).json({
      message: "Admin profile updated successfully",
      data: updatedAdmin
    });

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error
    });
  }
};

