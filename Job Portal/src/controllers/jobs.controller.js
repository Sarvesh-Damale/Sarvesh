
import JobModel from "../models/job.model.js"


var jobs;
export default class JobController{
getJobs(req,res){
    jobs=JobModel.getJobs();
    console.log("In list jobs")
    res.render("jobs.ejs",{jobs:jobs,email:req.session.email,name:req.session.name})
}


displayJobDetails(req,res){
    const id=req.params.id;
    const job=JobModel.getJob(id);
    res.render("job-detail.ejs",{job:job,email:req.session.email,name:req.session.name})
}

getApplicants(req,res){
    const id=req.params.id;
    const job=JobModel.getJob(id);
    res.render("display-applicants.ejs",{applicants:job.applicants,email:req.session.email,name:req.session.name})
}

getNewJob(req,res){
    res.render("addnewjob.ejs",{email:req.session.email,name:req.session.name})
}

addnewJob(req,res){
    const {category, designation, companyname, joblocation, salary, positions,skills, applyby}=req.body;
    JobModel.addJob(category, designation, companyname, joblocation, salary, positions,skills, applyby);
    jobs=JobModel.getJobs();
    res.render("jobs.ejs",{jobs:jobs,email:req.session.email,name:req.session.name})
}

updateJobForm(req,res){
    const id=req.params.id;
    const job=JobModel.getJob(id);
    res.render("updatejob.ejs",{job:job,email:req.session.email,name:req.session.name})

}
updateJob(req,res){
    const id=req.params.id;
    const {category, designation, companyname, joblocation, salary, positions,skills, applyby}=req.body;
    JobModel.updateJob(id,category, designation, companyname, joblocation, salary, positions,skills, applyby);
    jobs=JobModel.getJobs();
    console.log(`Inside update Job`)
    const job=JobModel.getJob(id);
    res.render("job-detail.ejs",{job:job,email:req.session.email,name:req.session.name})

}

deleteJob(req,res){
    const id=req.params.id;
    JobModel.deleteJob(id);
    jobs=JobModel.getJobs();
    console.log(`In delete job id: ${id}`)
    res.render("jobs.ejs",{jobs:jobs,email:req.session.email,name:req.session.name});
    console.log('After delete')
}
}