import { body, validationResult } from "express-validator";


export const validateForm = async (req,res,next)=>{

const rules=[body('name').notEmpty().withMessage('Name can not be empty'),
body('email').isEmail().withMessage('Not a valid email'),
body('password').notEmpty().withMessage('Password can not be empty')];


await Promise.all(rules.map(rule => rule.run(req)));

var validationErrors=validationResult(req);


if(!validationErrors.isEmpty())
{
    res.render("register.ejs", {errors:validationErrors.errors})
}
next();

}

export const invalidUrl = (req,res) =>{
    res.render("invalid-url.ejs")
}
