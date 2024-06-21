import mongoose from "mongoose";


export const questionSchema= mongoose.Schema({

    question:{type:String, required:true},

    options:[
        {type:mongoose.Schema.Types.ObjectId, ref:'option'}
    ]
})