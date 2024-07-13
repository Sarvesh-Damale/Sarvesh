import mongoose from "mongoose";


export const feedBackSchema = mongoose.Schema({

    email:{type:String, required:true},

    parameter:{type:String, required:true},

    rating:{type:String, required:true},

    comment:{type:String, required:true}

})