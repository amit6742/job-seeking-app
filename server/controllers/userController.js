import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("please fill registration form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("email aleady exist"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  sendToken(user, 200, res, "Registered successfully");
});


export const login = catchAsyncErrors(async(req, res, next)=>{
   const {email, password, role} = req.body
   if(!email || !password || !role){
    return next(new ErrorHandler("please fill login form", 400))
   }
   const user = await User.findOne({email}).select("+password")
   if(!user){
   return next( new ErrorHandler("invalid email password", 400))
   }
   const isPasswordMatch = await user.comparePassword(password) 
   if(!isPasswordMatch){
     return next (new ErrorHandler("invalid email password", 400))
     

   }
   if(user.role !== role){
     return next (new ErrorHandler("user with this role not found", 400))
   }
   sendToken(user, 200, res, "login successfully")
})

export const logout = catchAsyncErrors(async(req, res, next)=>{
  
  res.status(201).cookie("token", "",{
    httpOnly:true,
    expires: new Date(Date.now())
  }).json({
    success:true,
    message:"logout successfully"



  })
})
