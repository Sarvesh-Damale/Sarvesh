import mongoose from "mongoose";
import { EmployeeSchema } from "../schemas/employee.schema.js";


export const EmployeeModel = mongoose.model("Employee", EmployeeSchema)

export default class EmployeeRepository{

    async addEmployee(name, email, password, doj)
    {
        const result = await EmployeeModel.findOne({email:email})
        if(!result)
        {    
        const employee=new EmployeeModel({
            email:email,
            name:name,
            password:password,
            doj:doj
        })

        await employee.save();
        return employee;
    }
    else{
        return false;
    }
        
    }

    async getEmployees()
    {
        const employees = await EmployeeModel.find()
        return employees;
    }

    async deleteEmployee(id)
    {
        await EmployeeModel.findByIdAndDelete(id);
        return true;
    }

    async postLogin(email, password)
    {
        const employee = await EmployeeModel.findOne({email:email, password:password})
        return employee;
    }

    async addReviewer(email, reviewerEmail)
    {
        console.log(email, reviewerEmail)
        const employee = await EmployeeModel.findOne({email:reviewerEmail});
        if(employee)
            {
        await EmployeeModel.findByIdAndUpdate(employee._id,{$push:{feedbacksToAdd:email}})
        return true;
            }
            return false;
    }

    async getFeedbackList(email)
    {
        const employee = await EmployeeModel.findOne({email:email})
        console.log(typeof(employee.feedbacksToAdd))
        return employee.feedbacksToAdd;
    }


}