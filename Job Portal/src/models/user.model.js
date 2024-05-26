
export default class UserModel{


    constructor(id,name,email,password)
    {
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password
    }

    static addUser(id,name,email,password)
    {
        const user=new UserModel(id,name,email,password);
        users.push(user);
    }

    static getUsers()
    {
        return users;
    }

    static validUser(email, password)
    {
        
        const user=users.find(user =>{
            if(user.email==email && user.password==password)
            {
                console.log(`user: ${user}`)
                return user;
            }
        })
        return user;
    }


}

var users=[];