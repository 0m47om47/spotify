const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt =require("bcryptjs")


async function registerUser(req,res) {
    const {userName,email,password,role = "user"}=req.body;
    const isUserAllReadyExists=await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    });    
    if (isUserAllReadyExists){
        return res.status(409).json({message: "user already exists"})
    }
    const hash=await bcrypt.hash(password, 10)

    const user=await userModel.create({
        userName,
        email,
        password:hash,
        role
    });
    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    // res.cookie=("token:",token)
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
});

    
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            userName:user.userName,
            email:user.email,
            role:user.role
        }
    })
}
async function loginUser(req, res){
    const{userName,email,password}=req.body;
    const user= await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({ message:"invalid credentials"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.statues(401).json({message:"invalid password credentials"})
    }
   const token=jwt.sign({
    id:user._id,
    role:user.role
   },process.env.JWT_SECRET)
   res.status(200).json({
    user:{
        id:user._id,
        userName:user.userName,
        email:user.email,
        role:user.role,
    }
   })
}
module.exports={registerUser,loginUser}