import mongoose from "mongoose";


const connectToMongodb = ()=>{
    mongoose.connect("mongodb://localhost:27017/employeeFeedback")
    .then(
        console.log("Connected to mongdb")
    )
    .catch("Mongodb is not connected")
}

export default connectToMongodb;