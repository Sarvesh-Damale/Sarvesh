
export default class JobModel{
    constructor(id,jobCategory,jobDesignation,jobLocation,companyName,salary,
        applyby,skillsRequired,numberOfOpenings,jobPosted,applicants)
        {
            this.id=id;
            this.jobCategory=jobCategory;
            this.jobDesignation=jobDesignation;
            this.jobLocation=jobLocation;
            this.companyName=companyName;
            this.salary=salary;
            this.applyby=applyby;
            this.skillsRequired=skillsRequired;
            this.numberOfOpenings=numberOfOpenings;
            this.jobPosted=jobPosted;
            this.applicants=applicants
        }

    static getJobs()
    {
        return jobs;
    }

    static addJob(category, designation, companyname, joblocation, salary, positions,skills, applyby)
    {
        const id=jobs.length + 1;
        const job=new JobModel(id,category, designation,  joblocation, companyname, salary, applyby, skills, positions, new Date().toLocaleDateString(), []);
        jobs.push(job)
    }

    static getJob(id)
    {
        const job=jobs.find((job) =>{
            if(job.id==id)
            return job
        })
        return job;
    }

    static deleteJob(id)
    {
        const index=jobs.find((job,index) =>{
            if(job.id==id)
            return index
        })
        jobs.splice(index,1);
    }

    static updateJob(id,category, designation, companyname, joblocation, salary, positions,skills, applyby){
        jobs.find((job) =>{
            if(job.id==id)
            {
                job.companyName=companyname;
                job.jobCategory=category;
                job.jobDesignation=designation;
                job.applyby=applyby;
                job.numberOfOpenings=positions;
                job.skillsRequired=skills;
                job.salary=salary;
                job.jobLocation=joblocation;

            }
        })

    }
}


var jobs=[new JobModel(1,"Tech","Full Stack Developer","Pune","Capgemini","Rs 5-6 LPA","01-05-2024",["pyhton", "sql","django","react"],4,new Date().toLocaleDateString(),[]),new JobModel(2,"Tech","Frontend Developer","Pune","TCS","Rs 5-10 LPA","01-05-2024",["java", "sql","React","python","Nodejs"],4,new Date().toLocaleDateString(),[])]