const musicModel=require("../models/music.model");
const jwt=require("jsonwebtoken");

async function createMusic(req,res) {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try{
        const decoded=jswt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"you dont have access to create an music"
            })
        }
    }
    catch (error){
        return res.staus(401).json({message:"unauthorized"})
    }

    const {title}=req.body;
    const file=req.file

    


}