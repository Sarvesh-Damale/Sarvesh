import ApplicationError from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class PostModel{
    constructor(id,userId,caption,imageUrl)
    {
        this.id=id;
        this.userId=userId;
        this.caption=caption;
        this.imageUrl=imageUrl;
    }

    static addPost(userid,caption,imageurl)
    {
        const user=UserModel.getAllUsers().find(user=> user.id==userid)
        if(!user)
            {
                throw new ApplicationError("User not found", 404)
            }
        const id=posts.length+1;
        const post=new PostModel(id,userid,caption,imageurl);
        posts.push(post);
        console.log(posts)
        return post;
    }

    static getAllPosts()
    {
        return posts;
    }

    static getPostByPostId(postid)
    {
        const post=posts.find(post=> post.id==postid)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
        return post;
    }

    static deletePost(postid,userid)
    {
        const postIndex=posts.findIndex(post=> post.id==postid && post.userId==userid);
        if(postIndex>=0)
            {
                posts.splice(postIndex,1)
                return;
            }
        throw new ApplicationError("Post not found", 404)
    }

    static getPostsByUserid(userid)
    {
        const userposts=posts.filter(post=> post.userId==userid)
        return userposts;
    }

    static updatePost(postid,caption,imageurl,userid)
    {
        const post=posts.find(post=> post.id==postid && post.userId==userid)
        if(!post)
            {
                throw new ApplicationError("Post not found", 404)
            }
            if(caption)
            post.caption=caption;
            if(imageurl)
            post.imageUrl=imageurl
            return post;       
    }
}

var posts=[];