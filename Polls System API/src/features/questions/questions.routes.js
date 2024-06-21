import express from "express";
import QuestionsController from "./questions.controller.js";
const questionsRouter = express.Router();


const questionsController = new QuestionsController();

questionsRouter.post("/create", (req,res,next)=>{
    questionsController.createQuestion(req, res, next)
})

questionsRouter.post("/:id/options/create", (req,res,next)=>{
    questionsController.createQuestion(req, res, next)
})

questionsRouter.get("/:id", (req,res,next)=>{
    questionsController.viewQuestion(req, res, next)
})

questionsRouter.delete("/:id/delete", (req,res,next)=>{
    questionsController.deleteQuestion(req, res, next)
})

export default questionsRouter;