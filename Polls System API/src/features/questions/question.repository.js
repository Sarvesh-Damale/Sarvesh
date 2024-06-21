import mongoose, { mongo } from "mongoose";
import { questionSchema } from "./questions.schema.js";
import ApplicationError from "../../error-handler/applicationerror.js";


export const questionModel = mongoose.model("question", questionSchema);
export default class QuestionRepository{

    async createQuestion(question)
    {
        const newQuestion= new questionModel({
            question:question
        })
        await newQuestion.save();
        return newQuestion;
    }

    async viewQuestion(qId)
    {
        const question=await questionModel.findById(qId);
        if(!question)
            {
                throw new ApplicationError("Question not found", 404);
            }
        return question.populate('options');
    }

    async deleteQuestion(qId)
    {
        const question=await questionModel.findById(qId);
        if(!question)
            {
                throw new ApplicationError("Question not found", 404);
            }
        const questionWithOptions=await question.populate('options')
        const votes=questionWithOptions.options.filter(option=> option.votes > 0);
        if(votes.length > 0)
            {
                throw new ApplicationError("Question can't be deleted", 400);
            }
        await questionModel.findByIdAndDelete(qId);

    }


}