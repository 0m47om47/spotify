const mongoose=require("mongoose");
// require('dotenv').config();

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connect succesfully");
    }
    catch(err){
        console.log("db not connected");
    }
}
module.exports=connectDB;