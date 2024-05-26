
import userModel from "../models/user.model.js";
import JobModel from "../models/job.model.js"

var jobs;

export default class LoginController{
getLogin(req,res){
    res.render("login.ejs",{error:null});
}

postLogin(req,res){
    const{email, password} = req.body;
    const user=userModel.validUser(email,password);
    console.log(user);
    if(user)
    {
        jobs=JobModel.getJobs();
        req.session.email=email;
        req.session.name=user.name;
        return res.redirect('/jobs');

    }
    res.render("login.ejs",{error:"Invalid credentials"})
}


getRegister(req,res){
    res.render("register.ejs",{errors:null});
}


postRegister(req,res){
    const{name, email, password} = req.body;
    const users=userModel.getUsers();
    const id=users.length + 1;
    userModel.addUser(id,name,email,password);
    res.render("login.ejs",{error:null});
}

logout(req,res){
    req.session.destroy((err)=>{
        if(err){
        console.log(err)
        }
        else{
            res.redirect("/login")
        }
    })
}
}