

export default class LandingPageController{
showHomePage(req,res){
    console.log("Inside homepage");
    if(req.session.email)
    {
        return res.redirect("/jobs");
    }
    res.render("landing-page.ejs",{email:req.session.email});
}
}