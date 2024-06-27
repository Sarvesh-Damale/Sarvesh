import HabitRepository from "../repositories/habit.repository.js";


const daysOfWeek= showLastSevenDays();
let stausOfWeek=[];
daysOfWeek.forEach(day=> stausOfWeek.push({day:day, status:"none"}));

export default class HabitController{

    constructor()
    {
        this.repository = new HabitRepository();
    }


    async displayHabits(req,res)
    {
        const habits=await this.repository.showHabits();
        res.render("habits.ejs",{habits:habits});
    }

    async addHabit(req,res)
    {
        const { habit } = req.body;
        console.log(stausOfWeek)
        await this.repository.addHabit(habit, stausOfWeek)
        res.redirect("/habits");
    }

    async displayWeek(req, res)
    {
        const habit=req.params.habit;
        console.log(stausOfWeek);
        const habitData = await this.repository.getHabit(habit, stausOfWeek);
        //console.log(habitData.days)
        const totalDays= habitData.days.length;
        let completedDays=0;
        habitData.days.forEach((day)=>{
            if(day.status=='done')
                {
                    completedDays+=1;
                }
        })
        res.render("weekly-view.ejs", {habit:habit, days:habitData.days,totalDays,completedDays})

    }

    async markProgress(req, res)
    {
        const habit= req.params.habit;
        const daysOfWeek= showLastSevenDays();
        let statusOfDay=[];
        console.log(habit,req.body)
        daysOfWeek.forEach(day=> {
            if(day==req.body.day)
                {
                    console.log("In foreach", req.body.status)
                    statusOfDay={day:day, status:req.body.status}
                }
            })
        //console.log(statuses)
        const habitData = await this.repository.updateProgress(statusOfDay, habit);
        const totalDays= habitData.days.length;
        let completedDays=0;
        habitData.days.forEach((day)=>{
            if(day.status=='done')
                {
                    completedDays+=1;
                }
        })
        res.render("weekly-view.ejs", {habit:habit, days:habitData.days,totalDays,completedDays})
    }
}




function getDaysOfCurrentWeek() {
    const daysOfWeek = [];
    const today = new Date();
    const todayMinusSevenDays = new Date()
    
    todayMinusSevenDays.setDate(today.getDate() - 6);
    
    for (let i = 0; i < 7; i++) {
        const day = new Date(todayMinusSevenDays);
        day.setDate(todayMinusSevenDays.getDate() + i);
        daysOfWeek.push(day);
    }
    
    return daysOfWeek;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function showLastSevenDays() {
    const daysOfCurrentWeek = getDaysOfCurrentWeek();
    var daysOfWeek=[];
    daysOfCurrentWeek.forEach(day => {
        daysOfWeek.push(formatDate(day));
    });
    return daysOfWeek;
}

