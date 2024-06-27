import mongoose from "mongoose";

export const habitSchema = mongoose.Schema({

    habit:{type:String, required:true},

    days:[{type:mongoose.Schema.Types.ObjectId, ref:'day'}]
})