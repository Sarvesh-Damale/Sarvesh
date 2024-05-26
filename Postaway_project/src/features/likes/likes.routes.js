
import express from "express";
import LikesController from "./likes.controller.js";

const likeRouter = express.Router();
const likesController = new LikesController();

likeRouter.post("/toggle/:postId", likesController.toggleLikeByPostid);

likeRouter.get("/:postId", likesController.getAllLikesByPostid);


export default likeRouter;