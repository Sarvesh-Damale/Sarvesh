import mongoose from "mongoose";


export const EmployeeSchema = mongoose.Schema({

    name:{type:String, required:true},

    email:{type:String, required:true},

    password:{type:String, required: true},

    doj:{type:String, required: true},

    userType:[{type:String}],

    feedbacksToAdd:[{type:String}]

})


