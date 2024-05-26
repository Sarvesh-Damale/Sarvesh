
import path from "path";
import PostModel from "./post.model.js";
export default class PostConntroller{

    addPost(req,res)
    {   
        console.log(path.resolve())
        const {caption} = req.body;
        const post=PostModel.addPost(req.userid,caption,path.resolve()+"\\public\\images\\"+req.file.filename);
        res.status(201).send(post);

    }

    deletePostById(req,res)
    {
        const postid=Number(req.params.id);
 
            PostModel.deletePost(postid,req.userid)
            res.status(200).send("Post deleted")

    }

    getAllPosts(req,res)
    {
        const posts=PostModel.getAllPosts();
        res.status(200).send(posts)
    }

    getPostsByUserid(req,res)
    {
        const userid=req.userid;
        const posts=PostModel.getPostsByUserid(userid);
        res.status(200).send(posts)
    }

    getPostById(req,res)
    {
        console.log(typeof req.params.id)
        const postid=Number(req.params.id);
        const post=PostModel.getPostByPostId(postid);
        res.status(200).send(post);

    }

    updatePostById(req,res)
    {  
        const postid=Number(req.params.id);
        var filename;
        try{
            filename=req.file.filename
        }
        catch(err){
            filename=null
        }
        const result=PostModel.updatePost(postid,req.body.caption,filename,req.userid)
        res.status(200).send(result);
    }



}