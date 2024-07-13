import { EmployeeModel } from "./employee.repository.js"
const adminEmail="admin@gmail.com"
const adminPassword="admin"

export default class AdminRepository{

    async adminLogin(email, password)
    {
        if(email==adminEmail && password==adminPassword)
            {
                return true 
            }
        else{
            const employee = await EmployeeModel.findOne({email:email})
            if(employee.userType.length>0)
                {
                    if(email==employee.email && password==employee.password)
                        {
                            return true;
                        }
                }
            else{
                return "You are not an admin"
            }
        }
        return false
    }

    async makeAdmin(email)
    {
        const employee = await EmployeeModel.findOne({email:email})
        console.log("In make admin", email)
        console.log(employee)
        if(employee.userType.length==0)
            {
        await EmployeeModel.findByIdAndUpdate(employee._id,{$push:{userType:"admin"}});
            }
        return true;
    }


}