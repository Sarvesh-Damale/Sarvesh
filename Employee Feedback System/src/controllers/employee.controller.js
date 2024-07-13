import EmployeeRepository from "../repositories/employee.repository.js";

export default class EmployeeController{

    constructor()
    {
        this.repository = new EmployeeRepository();
    }


    async addEmployee(req, res, next)
    {
        const {name, email, doj} = req.body;
        console.log(doj, typeof(doj))
        const password = email.split("@")[0];
        const employee=await this.repository.addEmployee(name, email, password, doj);
        res.render("adminhome.ejs")
    }

    async getEmployees(req, res, next)
    {
        const employees = await this.repository.getEmployees();
        console.log(employees)
        res.render("employees.ejs",{employees:employees,email:req.session.email});
    }

    async deleteEmployee(req, res, next)
    {
        const id= req.params.id;
        await this.repository.deleteEmployee(id);
        res.redirect("/getEmployees")
    }

    async registerEmployee(req, res, next)
    {
        const {name, email, doj, password} = req.body;
        const result = await this.repository.addEmployee(name, email, password, doj);
        if(result)
        res.redirect("/employeeLogin")
        else{
            res.render("register.ejs", {error:"Email id already registered"})
        }
    }

    async getLoginPage(req, res, next)
    {
        res.render("employeeLogin.ejs",{error:null})
    }

    async postLogin(req, res, next)
    {
        const {email, password} = req.body;
        const employee = await this.repository.postLogin(email, password);
        if(employee)
            {
                const employees = await this.repository.getFeedbackList(email)
                req.session.email = email;
                req.session.userType = "employee";
                res.render("feedbackList.ejs",{employees:employees,email:req.session.email,user:req.session.userType})
            }
        else{
            res.send("Invalid credentials")
        }
    }

    async assignReviewer(req, res, next)
    {
        const email = req.params.email;
        const { reviwerEmail} = req.body;
        const result = await this.repository.addReviewer(email, reviwerEmail);
        if(result)
           { 
        res.send("Reviwer assigned successfully")
           }
        else{
            res.send("Invalid email id")
        }
    }


}