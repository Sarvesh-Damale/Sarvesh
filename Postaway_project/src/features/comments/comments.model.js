
import UserModel from "../user/user.model.js";
import UserController from "../user/user.controller.js";
import PostModel from "../posts/post.model.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class CommentModel{

    constructor(id, userid, postid, content)
    {
        this.id=id;
        this.userid=userid;
        this.postid=postid;
        this.content=content;
    }

    static addComment(userid,postid,content)
    {
        //Check if user exists
        const user=UserModel.getAllUsers().find(user=> user.id==userid)
        if(!user)
            {
                throw new ApplicationError("User not found", 404)
            }

        //Check if post exists
        const post=PostModel.getAllPosts().find(post=>post.id===postid)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
        const id=comments.length+1;
        const comment=new CommentModel(id,userid,postid,content)
        comments.push(comment)
        return comment;
    }

    static getComments(postid)
    {
        const post=PostModel.getAllPosts().find(post=>post.id==postid)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
        const postComments=comments.filter(comment=> comment.postid==postid)
        return postComments;
    }

    static deleteComment(commentid,userid)
    {
        const commentIndex=comments.findIndex(comment=> comment.id==commentid && comment.userid==userid)
        if(commentIndex>=0)
            {
                comments.splice(commentIndex,1)
            }
            throw new ApplicationError("Comment not found", 404)
    }

    static updateComment(commentid,content,userid)
    {
        const comment=comments.find(comment=> comment.id==commentid && comment.userid==userid);
        if(!comment)
            {
                throw new ApplicationError("Comment not found", 404)
            }
            comment.content=content;

            return comment;
    }

    

}

var comments=[];