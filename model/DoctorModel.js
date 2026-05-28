
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  profile: String,
  experience: String,
  about: String,
   status: {
    type: String,
   
    default: "Available"
  },
  brought: {
    type: String
  }
});

module.exports = mongoose.model("Doctor", doctorSchema, "Doctors");