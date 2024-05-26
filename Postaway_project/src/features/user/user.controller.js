
import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
export default class UserController{

  signUp(req,res){
    console.log(req.body)
    const {name, email, password}= req.body;
    const user=UserModel.addUser(name,email,password)
    res.status(201).send(user);
  }

  signIn(req,res)
  {
    console.log(req.body)
    const {email, password}=req.body;
    const user=UserModel.validateUser(email,password);
    if(!user)
        {
            res.status(400).send("Invalid credentials")
        }
        const token=jwt.sign(
            {userid:user.id},
            'hdRKqepbuYXoToOCecij0znAXkZuiBZj',
        {
            expiresIn:'1h'
        })
        res.status(200).send(token)

  }

}