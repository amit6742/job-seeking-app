import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new  mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email:{
    type:String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  coverLetter:{
    type: String,
    required: [true, "Please provide a cover letter."],
    minLength: [30, "Cover letter must contain at least 30 Characters!"],
    maxLength: [500, "Cover letter cannot exceed 500 Characters!"],

  },
  phone:{
    type: Number,
    required: [true, "Please provide phone number."],
   

  },
  address:{
    type: String,
    required: [true, "Please provide address."],
    minLength: [20, "Address must contain at least 20 characters!"],
  },

    resume: {
      public_id: {
        type: String, 
        required: true,
      },
      url: {
        type: String, 
        required: true,
      },
   
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },

})
export const Application = mongoose.model("Application", applicationSchema);