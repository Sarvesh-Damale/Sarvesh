import jwt from "jsonwebtoken";

const jwtAuth=(req,res, next)=>{
    const token=req.headers['authorization']
    console.log(token)
    if(!token)
        {
            res.status(401).send("Unauthorized")
        }
    try{
        const payload= jwt.verify(token,"hdRKqepbuYXoToOCecij0znAXkZuiBZj")
        req.userid=payload.userid;
        }
    catch(err)
    {
        res.status(401).send("Unauthorized")
    }

    next();

}

export default jwtAuth;
