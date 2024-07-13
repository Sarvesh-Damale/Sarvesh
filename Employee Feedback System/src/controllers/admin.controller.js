import AdminRepository from "../repositories/admin.repository.js";


export default class AdminController{

    constructor()
    {
        this.repository= new AdminRepository();
    }
    getLogin(req,res){
        res.render("login.ejs",{error:null});
    }

    async postLogin(req,res,next)
    {
        const {email, password} = req.body;
        const result=await this.repository.adminLogin(email, password)
        console.log(`In login  ${result}`)
        if(result=="You are not an admin")
            {
                return res.render("login.ejs",{error:result})
            }
        if(result)
            {
                req.session.email=email;
                req.session.userType="admin"
                res.render("adminhome.ejs",{email:req.session.email})
            }
        else{
            res.render("login.ejs",{error:"Invalid credentials"})
        }
        
    }

    postLogout(req, res, next)
    {
        if(req.session.userType=="admin")
            {
        req.session.destroy((err)=>{
            if(err){
            console.log(err)
            }
            else{
                res.redirect("/login")
            }
        })
        }
        else{
            req.session.destroy((err)=>{
                if(err){
                console.log(err)
                }
                else{
                    res.redirect("/employeeLogin")
                }
            })
        }
    }

    async addAdmin(req, res, next)
    {
        const email = req.params.email;
        await this.repository.makeAdmin(email)
        res.render("adminhome.ejs",{email:req.session.email})
    }

    getRegister(req,res)
    {
        res.render("register.ejs", {error:null})
    }


    getEmployeeForm(req,res,next)
    {
        res.render("addEmployee.ejs",{email:req.session.email})
    }



}