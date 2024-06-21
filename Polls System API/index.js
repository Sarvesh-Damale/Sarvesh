import express from "express";
import questionsRouter from "./src/features/questions/questions.routes.js";
import optionsRouter from "./src/features/options/options.routes.js";
import ApplicationError from "./src/error-handler/applicationerror.js";


const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).send("Welcome to Polling System API");
})

app.use("/api/questions", questionsRouter);

app.use("/api/options", optionsRouter);

app.use((err, req, res, next)=>{

    if(err instanceof ApplicationError)
    {
        res.status(err.errorCode).send(err.message);
    }
    else{
        res.status(500).send("Something went wrong. Please try again");
    }
})

app.use("/", (req,res)=>{
    res.status(404).send("Incorrect URL");
})
export default app;