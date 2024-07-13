import express from "express";
import LandingPageController from './src/controllers/landingpage.controller.js';
import expressEjsLayouts from 'express-ejs-layouts';
import AdminController from "./src/controllers/admin.controller.js";
import EmployeeController from "./src/controllers/employee.controller.js";
import FeedbackController from "./src/controllers/feedback.controller.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';

const app = express();

const landingPageController=new LandingPageController();
const adminController= new AdminController();
const employeeController = new EmployeeController();
const feedbackController = new FeedbackController();
// Middleware to parse incoming request bodies

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: "mysession",
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}))




app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressEjsLayouts)


app.get("/",landingPageController.showHomePage)

app.get("/login",adminController.getLogin)
app.post("/login",(req, res, next)=>{
    adminController.postLogin(req, res, next)
})

app.get("/logout", (req,res, next)=>{
    adminController.postLogout(req, res, next)
})

app.get("/register", adminController.getRegister)
app.post("/registerEmployee", (req, res, next) => {
    employeeController.registerEmployee(req, res, next)
})

app.get("/addEmployee",auth, (req, res, next)=>{
    adminController.getEmployeeForm(req, res, next)
})

app.post("/addEmployee", auth, (req, res, next)=>{
    employeeController.addEmployee(req, res, next)
})

app.get("/getEmployees", auth, (req, res, next)=>{
    employeeController.getEmployees(req, res, next)
})

app.get("/deleteEmployee/:id", auth, (req, res, next)=>{
    employeeController.deleteEmployee(req, res, next)
})

app.get("/addAdmin/:email", (req, res, next)=>{
    adminController.addAdmin(req, res, next);
})

app.get("/employeeLogin", (req, res, next)=>{
    employeeController.getLoginPage(req, res, next);
})

app.post("/employeeLogin", (req, res, next)=>{
    employeeController.postLogin(req, res, next);
})

app.get("/viewFeedback/:email", (req, res, next)=>{
    feedbackController.getFeedback(req, res, next);
})

app.get("/updateFeedback/:email", (req, res, next)=>{
    feedbackController.updateFeedback(req, res, next);
})

app.post("/postFeedback/:email", (req, res, next)=>{
    feedbackController.postFeedback(req, res, next);
})

app.get("/assignReviewer/:email", auth, (req, res, next)=>{
    feedbackController.getAssignReviewerPage(req, res, next);
})

app.post("/assignReviewer/:email", auth, (req, res, next)=>{
    employeeController.assignReviewer(req, res, next);
})

export default app;