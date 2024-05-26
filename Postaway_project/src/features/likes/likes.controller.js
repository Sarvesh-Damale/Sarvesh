
import LikesModel from "./likes.model.js";

export default class LikesController{

    toggleLikeByPostid(req,res)
    {
        const postid=Number(req.params.postId);
        const like=LikesModel.toggleLike(req.userid,postid);
        res.status(201).send(like);

    }

    getAllLikesByPostid(req,res)
    {
        const postid=Number(req.params.postId);
        const likes=LikesModel.getAllLikes(postid);
        res.status(200).send(likes);
    }


}