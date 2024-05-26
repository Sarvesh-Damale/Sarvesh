
import express from 'express';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';
import { uploadFile } from './src/middlewares/fileupload.middleware.js';
import ApplicantController from './src/controllers/applicant.controller.js';
import LandingPageController from './src/controllers/landingpage.controller.js';
import LoginController from './src/controllers/login.controller.js';
import { validateForm , invalidUrl} from './src/middlewares/login.middleware.js';
import JobController from './src/controllers/jobs.controller.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastvisit.middleware.js';


const app = express();

const ApplicantsController=new ApplicantController();
const LoginsController=new LoginController();
const JobsController=new JobController();
const LandingPageControllers=new LandingPageController();
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "mysession",
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}))
app.use(setLastVisit);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressEjsLayouts)
// Use method-override middleware


// Serve static files from the public directory
app.use(express.static('public'));
//routes

app.get("/",LandingPageControllers.showHomePage)
app.get("/register",LoginsController.getRegister)
app.post("/register",validateForm, LoginsController.postRegister)

app.get("/login",LoginsController.getLogin)
app.post("/login", LoginsController.postLogin)

app.get("/jobs",JobsController.getJobs)
app.get("/jobs/:id", JobsController.displayJobDetails)

app.get("/apply/:id", ApplicantsController.getApplicantForm)
app.post("/apply/:id", uploadFile.single("resume"), ApplicantsController.submitApplicantForm)

app.get("/applicants/:id", auth, JobsController.getApplicants)

app.get("/newjob",auth, JobsController.getNewJob)

app.post("/jobs", JobsController.addnewJob)

app.get("/updatejob/:id", auth, JobsController.updateJobForm)
app.post("/jobs/:id", JobsController.updateJob)


app.get("/delete/:id", auth, JobsController.deleteJob)

app.get("/logout", LoginsController.logout)

app.get('*',invalidUrl)

export default app;