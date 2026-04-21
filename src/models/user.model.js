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
        type:string,
        require:true
    },
    role:{
        type:String,
        enum:['user','artist'],
        default:'user'
    }
    
})
const userModel=mingoose.model("user",userSchema)
module.exports=userModel;