
import ApplicantModel from "../models/applicant.model.js";
import JobModel from "../models/job.model.js";

export default class ApplicantController{

getApplicantForm(req,res){
   res.render("applicant.ejs",{id:req.params.id,email:req.session.email})
}

 submitApplicantForm(req,res){
    const{name, email, contact} = req.body;
    const pdfFile = "/resumes/" + req.file.filename;
    const id = req.params.id;
    const job=JobModel.getJob(id);
    const applicants=ApplicantModel.getApplicants();
    const applicant=ApplicantModel.addApplicant(applicants.length+1,name,email,contact,pdfFile);
    job.applicants.push(applicant);
    const jobs= JobModel.getJobs();
    //res.render("jobs.ejs",{jobs:jobs,email:req.session.email});
    res.redirect("/jobs")

}
}
