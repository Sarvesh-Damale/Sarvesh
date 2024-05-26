
import UserModel from "../user/user.model.js";
import PostModel from "../posts/post.model.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class LikesModel{

    constructor(id,userId,postId)
    {
        this.id=id;
        this.userId=userId;
        this.postId=postId;
    }

    static toggleLike(userId,postId)
    {
        const user=UserModel.getAllUsers().find(user=> user.id==userId)
        if(!user)
            {
                throw new ApplicationError("User not found", 404)
            }

        //Check if post exists
        const post=PostModel.getAllPosts().find(post=>post.id==postId)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
        
        // Check if like is present or not
        const likeId=likes.length + 1;
        const likeIndex=likes.findIndex(like=> like.userId==userId && like.postId)
        if(likeIndex==-1)
            {
        const addlike=new LikesModel(likeId,userId,postId);
        likes.push(addlike);
            }
        else{
            likes.splice(likeIndex,1);
        }

        return "Like toggled"
    }

    static getAllLikes(postId)
    {
        const post=PostModel.getAllPosts().find(post=>post.id==postId)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
        const postLikes=likes.filter(like=> like.postId==postId);
        return postLikes;
    }

}

var likes=[];