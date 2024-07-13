import mongoose from "mongoose";
import { feedBackSchema } from "../schemas/feedback.schema.js";

const feedbackModel = mongoose.model("Feedback", feedBackSchema);

const feedbackParameters = ["Client satisfaction", "Training and development"];
export default class FeedbackRepository{


    async getFeedback(email)
    {
        const feedback = await feedbackModel.find({email:email});
        return feedback;
    }

    async addFeedback(body, email)
    {
      const pastFeedback=  await feedbackModel.find({email:email});
      if(pastFeedback.length==0)
        {
        for(let i=0;i<feedbackParameters.length;i++)
        {
            console.log(body[`evaluationParameter${i+1}-rating`])
            const feedback = new feedbackModel({
                email:email,
                parameter:feedbackParameters[i],
                rating:body[`evaluationParameter${i+1}-rating`],
                comment:body[`evaluationParameter${i+1}-comment`]
            })
            await feedback.save();
        }
    }
    else{

        for(let i=0;i<feedbackParameters.length;i++)
            {
                const updatefeedback = await feedbackModel.find({email:email, parameter:feedbackParameters[i]})
                await feedbackModel.findByIdAndUpdate(updatefeedback[0]._id,
                    {rating:body[`evaluationParameter${i+1}-rating`],comment:body[`evaluationParameter${i+1}-comment`]}
                )

            }
    }
        return true;

    }

}