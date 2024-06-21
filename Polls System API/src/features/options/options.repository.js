import mongoose from "mongoose";
import { optionSchema } from "./options.schema.js";
import { questionModel } from "../questions/question.repository.js";
import ApplicationError from "../../error-handler/applicationerror.js";
import { ObjectId } from "mongodb";
export const optionModel = mongoose.model("option", optionSchema)
export default class OptionsRepository{

    async createOption(option,qId)
    {
        const newOption= new optionModel({
            option:option,
            votes:0
        })
        await newOption.save();
        const link_to_vote=`http://localhost:3000/api/options/${newOption._id}/add_vote`;
        await optionModel.findByIdAndUpdate(newOption._id,{link_to_vote:link_to_vote});
        await questionModel.findByIdAndUpdate(qId,{$push:{options:newOption}});
        return newOption;
    }

    async addVote(optionId)
    {
        const option= await optionModel.findByIdAndUpdate(optionId,{$inc:{votes:1}})
    }

    async deleteOption(optionId,questionId)
    {
        const option=await optionModel.findById(optionId);
        if(!option)
            {
                throw new ApplicationError("Option not found", 404);
            }
        if(option.votes > 0)
            {
                throw new ApplicationError("Can not delete option as it has votes", 400);
            }
        await optionModel.findByIdAndDelete(optionId);
        await questionModel.findByIdAndUpdate(questionId,{$pull:{options:new ObjectId(optionId)}})

    }
}