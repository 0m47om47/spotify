const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");


async function registerUser(req,res) {
    const {userName,email,password,role = "user"}=req.body;
    const isUserAllReadyExists=await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })    
    if (isUserAllReadyExists){
        return res.status(409).json({message: "user already exists"})
    }
    const user=await userModel.connect({
        userName,
        Email,
        password,
        role
    })
    const token=jwt.sign({
        id:user._id,
        role=user._role,
    },process.env.JWT_SECRET)
    res.cokkies=("token:",token)
    
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