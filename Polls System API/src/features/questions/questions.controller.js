import QuestionRepository from "./question.repository.js";

export default class QuestionsController{

    constructor()
    {
        this.repository = new QuestionRepository();
    }

    async createQuestion(req,res,next)
    {
        const {question} = req.body;
        try{
        const newQuestion= await this.repository.createQuestion(question);
        res.status(201).send(newQuestion);
        }
        catch(err)
        {
            next(err);
        }

    }

    async viewQuestion(req, res, next)
    {
        const questionId=req.params.id;
        try{
            const question=await this.repository.viewQuestion(questionId);
            res.status(200).send(question);
        }
        catch(err)
        {
            next(err);
        }
    }

    async deleteQuestion(req, res, next)
    {
        const questionId=req.params.id;
        try{
            await this.repository.deleteQuestion(questionId);
            res.status(200).send("Question deleted successfully")
        }
        catch(err)
        {
            next(err);
        }
    }

}