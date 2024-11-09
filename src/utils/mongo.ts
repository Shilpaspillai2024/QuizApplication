import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("please define the Mongo_Uri env variable")

}

export const connectiondb=async()=>{
    if(mongoose.connection.readyState >=1) return
    

    return mongoose.connect(MONGODB_URI)

}