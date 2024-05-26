import express from "express";

import CommentController from "./comments.controller.js";

const commentController= new CommentController();

const commentRouter=express.Router();


commentRouter.get("/:id", commentController.getCommentsByPost);

commentRouter.post("/:id", commentController.addComment);

commentRouter.delete("/:id", commentController.deleteCommentByCommentId);

commentRouter.put("/:id", commentController.updateCommentByCommentId);

export default commentRouter;