
export  const auth = (req,res,next) =>{
    if(req.session.email)
    {
        next()
    }
    else{
        res.render("hidden-page.ejs")
    }
}