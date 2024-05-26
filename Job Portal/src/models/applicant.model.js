
export default class ApplicantModel{
    constructor(applicantId,name,email,contact,resumePath)
    {
        this.applicantId=applicantId;
        this.name=name;
        this.email=email;
        this.contact=contact;
        this.resumePath=resumePath
    }

    static addApplicant(id,name,email,contact,resumepath)
    {
        const applicant=new ApplicantModel(id,name,email,contact,resumepath);
        applicants.push(applicant);
        return applicant;
    }

    static getApplicants()
    {
        return applicants;
    }
}

var applicants=[];