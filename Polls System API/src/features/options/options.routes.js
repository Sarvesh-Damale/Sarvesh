import express from "express";
import OptionsController from "./options.controller.js";

const optionsRouter = express.Router();

const optionsController = new OptionsController();


optionsRouter.delete("/:id/delete", (req, res, next)=>{
    optionsController.deleteOption(req, res, next);
})

optionsRouter.post("/:id/create", (req, res, next)=>{
    optionsController.createOption(req, res, next);
})

optionsRouter.post("/:id/add_vote", (req, res, next)=>{
    optionsController.addVote(req, res, next);
})





export default optionsRouter;