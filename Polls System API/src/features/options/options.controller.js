import OptionsRepository from "./options.repository.js";

export default class OptionsController{

    constructor()
    {
        this.repository = new OptionsRepository();
    }


    async deleteOption(req, res, next)
    {
        const optionId = req.params.id;
        const {questionId} = req.body;
        try{
            await this.repository.deleteOption(optionId, questionId);
            res.status(200).send("Option deleted successfully");
        }
        catch(err)
        {
            next(err);
        }
    }

    async createOption(req, res, next)
    {
        const questionId = req.params.id;
        const {option} = req.body;
        try{
            const newOption = await this.repository.createOption(option, questionId);
            res.status(201).send(newOption);
        }
        catch(err)
        {
            next(err);
        }
    }

    async addVote(req, res, next)
    {
        const optionId = req.params.id;
        try{
            await this.repository.addVote(optionId);
            res.status(201).send("Vote added successfully");
        }
        catch(err)
        {
            next(err);
        }
    }

}