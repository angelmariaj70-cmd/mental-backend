const doctor=require('../model/DoctorModel')
const Stripe=require('stripe')(process.env.stripeKey)
exports.viewDoctor=async(req,res)=>{
  console.log("Inside view doctors");
 
  
  try {
   
    
    const viewDoctor=await doctor.find()
    res.status(200).json({message:"All Psychologists are successfully fetched",viewDoctor})
  } catch (error) {
    res.status(500).json({message:"Server err",error})
  }
  
}
//to get the details of a single doctor
exports.viewSingleDoctor=async(req,res)=>{
  console.log("Inside view doctor");
 const {id}=req.params
  
  try {
   
    
    const single=await doctor.findOne({_id:id})
    res.status(200).json({message:"The details of a single doctor is fetched",single})
  } catch (error) {
    res.status(500).json({message:"Server err",error})
  }
  
}
exports.makePayment=async(req,res)=>{
  console.log("Inside payment");
  const email=req.payload
  const {doctorDetails}=req.body
  console.log("ID:", doctorDetails?._id);
  
  console.log("Doctor Details:", doctorDetails);


  try {
 const id = doctorDetails._id || doctorDetails.id;

const doctorPayment = await doctor.findByIdAndUpdate(
  doctorDetails._id,
  {
    $set: {
      status: "Booked",
      brought: email
    }
  },
  { new: true }
);

console.log("ID USED:", doctorDetails._id);
console.log("UPDATED DOC:", doctorPayment);
        const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: doctorDetails.name,
            description: doctorDetails.specialization,
            images: doctorDetails.profile ? [doctorDetails.profile] : [],
            metadata: {
              experience:doctorDetails.experience,
                       about:doctorDetails.about,
                       status:"pending",
              brought: email,
            },
          },
          unit_amount: 50000,
        },
        quantity: 1,
      },
    ];
    const roomId = Date.now().toString();
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
success_url: `https://mental-frontend-five.vercel.app/payment-success?room=${roomId}`,
      cancel_url: "https://mental-frontend-five.vercel.app/payment-error",
      line_items,
      mode: "payment",
    });
    console.log(session)
    res.status(200).json({message:"Payment success",url:session.url,})
  } catch (error) {
    console.log(error);
    
  }
  
}

//to get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await doctor.find(
      {status:"Booked"}
    );

    console.log("BOOKINGS:", bookings); 

    res.status(200).json({ message:"fetching successfull",
      data: bookings
    });

  } catch (err) {
    res.status(500).json(err);
  }
};
exports.findAllDoctors = async (req, res) => {
  try {
    const doctors = await doctor.find();
    // console.log("ID:", id);
    res.status(200).json({message:"All doctors are fetchedd successfully",doctors});
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.viewDoctor=async(req,res)=>{
  console.log("Inside view doctors");
 
  
  try {
   
    
    const viewDoctor=await doctor.find()
    res.status(200).json({message:"All Psychologists are successfully fetched",viewDoctor})
  } catch (error) {
    res.status(500).json({message:"Server err",error})
  }
  
}



//update profile of a doctor 
exports.updateDoctorProfile = async (req, res) => {
  console.log("Inside update doctor profile");

  try {
    const { id } = req.params; 

    const { name, specialization, experience, about } = req.body;

    const updatedDoctor = await doctor.findByIdAndUpdate(
      id,
      {
        name,
        specialization,
        experience,
        about,
        ...(req.file && { profile: req.file.filename })
      },
      { new: true }
    );

    res.status(200).json({
      message: "Doctor profile updated successfully",
      data: updatedDoctor
    });

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error
    });
  }
};
//delete a doctor
exports.deleteADoctor=async(req,res)=>{
  console.log("Inside deletion of a pyscholgoist");
  const {id}=req.params
  try {
    const onedoctor=await doctor.deleteOne({_id:id})
    res.status(200).json({message:"Doctor is deleted successfully",onedoctor})
  } catch (error) {
    res.status(500).json({message:"Server error is found",error})
  }
}
// appproval of a doctor
exports.approveDoctor = async (req, res) => {

  console.log("Inside approve doctor");

  const { id } = req.params;

  try {

    const approvedDoctor =
      await doctor.findByIdAndUpdate(
        id,
        {
          status: "approved"
        },
        { new: true }
      );

    res.status(200).json({
      message: "Doctor approved successfully",
      approvedDoctor
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }
};
// view doctors in the homepage
exports.homeDoctor=async(req,res)=>{
  console.log("Inside view doctors");
 
  
  try {
   
    
    const landDoctore=await doctor.find().sort({_id:-1}).limit(3)
    res.status(200).json({message:"All Psychologists are successfully fetched",landDoctore})
  } catch (error) {
    res.status(500).json({message:"Server err",error})
  }
  
}