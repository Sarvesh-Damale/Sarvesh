import mongoose from "mongoose";

export const optionSchema = mongoose.Schema({
    option:{type:String, required:true},

    votes:{type:Number},

    link_to_vote:{type:String}

})