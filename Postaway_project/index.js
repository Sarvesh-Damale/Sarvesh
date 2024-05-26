import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import jwtAuth from "./src/features/middlewares/jwt.middleware.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import ApplicationError from "./src/error-handler/applicationError.js";
import loggerMiddleware from "./src/features/middlewares/logger.middleware.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: 'json' };
const server=express();

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

server.use(express.static("public"))
server.use(express.json())
server.use(loggerMiddleware)

//Error handler middleware



server.use("/api", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth , commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);

server.use((err, req, res, next)=>{
    if(err instanceof ApplicationError)
        {
            res.status(err.errorCode).send(err.message)
        }
    console.log(err)
    res.status(500).send("Something went wrong. Please try again later")

})


server.use("/", (req,res)=>{
    res.status(404).send("Incorrect URL. Please see documentation http://localhost:3000/api-docs/");
})

export default server;