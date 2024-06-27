import express from "express";
import expressEjsLayouts from 'express-ejs-layouts';
import HomePageController from "./src/controllers/homepage.controller.js";
import HabitController from "./src/controllers/habit.controller.js";


const app = express();
const homePageController = new HomePageController();
const habitController = new HabitController();


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressEjsLayouts)


app.use(express.static('public'));

app.get("/", (req,res)=>{
    homePageController.showHomePage(req,res)
})


app.get("/addHabit", (req,res)=>{
    habitController.addHabit(req,res);
});

app.post("/addHabit", (req,res)=>{
    habitController.addHabit(req,res);
});

app.get("/habits", (req,res)=>{
    habitController.displayHabits(req,res);
});

app.get("/weekView/:habit", (req,res)=>{
    habitController.displayWeek(req,res);
});

app.post("/markProgress/:habit", (req,res)=>{
    habitController.markProgress(req,res);
});

export default app;