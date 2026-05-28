const mongoose=require('mongoose')

mongoose.connect(process.env.connectionString).then(res=>{
  console.log("Connection established");

})
.catch(err=>{
  console.log("Mongo db err",err);
  
})
