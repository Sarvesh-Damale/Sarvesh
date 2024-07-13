

export default class LandingPageController{
showHomePage(req,res){
    console.log("Inside homepage");
    if(req.session.email && req.session.userType=="admin")
    {
         return res.render("adminhome.ejs",{email:req.session.email});
     }
     if(req.session.email && req.session.userType=="employee")
        {
            return res.render("feedbackList.ejs",{email:req.session.email});
        }
    res.render("landing-page.ejs");
}
}