const question=require('../model/questionModel')
exports.viewQuestion=async(req,res)=>{
  console.log("Inside view questions");
 
  
  try {
   
    
    const viewquestion=await question.find()
    res.status(200).json({message:"All Questions fetched",viewquestion})
  } catch (error) {
    res.status(500).json({message:"Server err",error})
  }
  
}