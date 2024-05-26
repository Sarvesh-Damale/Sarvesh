
export const setLastVisit = (req,res,next) =>{
    console.log(req.cookies.lastVisit)
    if(req.cookies.lastVisit)
    {
        res.locals.lastVisit= new Date(req.cookies.lastVisit).toLocaleString();
    }
        res.cookie('lastVisit',new Date().toISOString(),{
            maxAge: 1*24*60*60*1000,
        })
  
    next();
}