import mongoose from "mongoose";

export const daySchema = mongoose.Schema({

    day:{type:String, required:true},

    habit:{type:String, required:true},

    status:{type:String, required:true}
    
}, { timestamps: true })