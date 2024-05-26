
import CommentModel from "./comments.model.js";

export default class CommentController{

    addComment(req,res)
    {
        const postid =Number(req.params.id);
        const userid=req.userid;
        const {content}=req.body;
        const result=CommentModel.addComment(userid,postid,content);
        res.status(200).send(result)

    }

    getCommentsByPost(req,res)
    {
        const postid =Number(req.params.id);
        const comments=CommentModel.getComments(postid);
        res.status(200).send(comments)
    }

    deleteCommentByCommentId(req,res)
    {
        const commentId=Number(req.params.id);
        const result=CommentModel.deleteComment(commentId,req.userid);
        res.status(200).send("Comment deleted");
    }

    updateCommentByCommentId(req,res)
    {
        const commentId=Number(req.params.id);
        console.log(req.body);
        const {content} = req.body;
        const result=CommentModel.updateComment(commentId,content,req.userid);
        res.status(201).send(result);
    }


}