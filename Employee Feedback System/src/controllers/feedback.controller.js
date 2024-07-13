import FeedbackRepository from "../repositories/feedback.repository.js";

const defaultFeedback = [{"parameter":"Client Satisfcation", "rating":"NA", "comment":"NA"},
    {"parameter":"Training and Certifications", "rating":"NA", "comment":"NA"}
]

export default class FeedbackController{

    constructor()
    {
        this.repository = new FeedbackRepository();
    }


    async getFeedback(req, res, next)
    {
        const email = req.params.email;
        const feedback = await this.repository.getFeedback(email);
        if(feedback.length==0)
            {
                res.render("feedbackview.ejs", {feedback:defaultFeedback,email:email})
            }
        else{
            res.render("feedbackview.ejs", {feedback:feedback,email:email})
        }
    }

    async updateFeedback(req, res, next)
    {
        const email = req.params.email;
        const feedback = await this.repository.getFeedback(email);
        if(feedback.length==0)
            {
                res.render("feedbackform.ejs",{feedback:defaultFeedback,email:email});
            }
        else{
            res.render("feedbackform.ejs",{feedback:feedback,email:email});
        }
        
    }

    async postFeedback(req, res, next)
    {
        const email = req.params.email;
        await this.repository.addFeedback(req.body, email);
        res.redirect(`/viewFeedback/${email}`);
    }

    async getAssignReviewerPage(req, res, next)
    {
        const email = req.params.email;
        res.render("assignReviewer.ejs", {email:email})
    }






}