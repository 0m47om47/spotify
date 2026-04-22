const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        require:true
    },
    email:{
      type:String,
      unique:true,
      require:true,  
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','artist'],
        default:'user'
    }
    
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel;