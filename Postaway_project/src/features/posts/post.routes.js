import express from "express";
import PostConntroller from "./post.controller.js";
import fileupload from "../middlewares/file-upload.middleware.js";

const postRouter=express.Router();
const postController=new PostConntroller();

postRouter.use(express.static("public"))
postRouter.post("/", fileupload.single('imageUrl'), postController.addPost)

// Retrieve posts based on user
postRouter.get("/", postController.getPostsByUserid)

// Retrive all users post
postRouter.get("/all", postController.getAllPosts)

postRouter.get("/:id", postController.getPostById)

postRouter.delete("/:id", postController.deletePostById)

postRouter.put("/:id", fileupload.single('imageUrl'),postController.updatePostById)



export default postRouter;