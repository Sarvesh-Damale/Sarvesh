import mongoose from "mongoose";


const connectToMongodb = ()=>{
    mongoose.connect("mongodb://localhost:27017/polls")
    .then(
        console.log("Connected to mongdb")
    )
    .catch("Mongodb is not connected")
}

export default connectToMongodb;