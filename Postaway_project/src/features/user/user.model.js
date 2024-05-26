

export default class UserModel{
    constructor(id,name,email,password)
    {
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static addUser(name,email,password)
    {
        const id=users.length+1;
        const user=new UserModel(id,name,email,password)
        users.push(user);
        return user;
    }

    static validateUser(email,password)
    {
        console.log(email,password)
        const user=users.find(u =>u.email===email && u.password===password)
        return user;
    }

    static getAllUsers()
        {
            return users;
        }
}

var users=[];