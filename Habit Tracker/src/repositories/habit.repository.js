import mongoose from "mongoose";
import { habitSchema } from "../schemas/habit.schema.js";
import { daySchema } from "../schemas/day.schema.js";

const habitModel = mongoose.model('habit', habitSchema);
const dayModel = mongoose.model('day', daySchema);

export default class HabitRepository{

    async addHabit(habit, statusOfWeek)
    {   
        const newHabit = new habitModel({
            habit:habit
        })
        await newHabit.save();
        statusOfWeek.forEach(async (status)=>{
            const day= new dayModel({
                day:status.day,
                habit:habit,
                status:status.status
            })
            setTimeout(async ()=>{
            await day.save();
            await habitModel.findByIdAndUpdate(newHabit._id,{$push:{days:day}});
        },300)
        })
        
    }

    async showHabits()
    {
        const habits=await habitModel.find();
        return habits;
    }

    async getHabit(habit, statusOfWeek)
    {   statusOfWeek.forEach(async (status)=>{
        const day= await dayModel.find({day:status.day, habit:habit});
        if(day.length==0)
            {
                const newDay= new dayModel({
                    day:status.day,
                    habit:habit,
                    status:status.status
                })
                setTimeout(async ()=>{
                    await newDay.save();
                const habita=await habitModel.find({habit:habit});
                await habitModel.findByIdAndUpdate(habita[0]._id,{$push:{days:newDay}});
            },300)
            }
            
        })
        const habitInfo = await habitModel.find({habit:habit});
        const habitInfoWithDays= await habitInfo[0].populate({
            path:'days',
            options: { sort: { createdAt: 1 } }
        });
        return habitInfoWithDays;
    }

    async updateProgress(statusOfDay,habit)
    {
        const habitData = await dayModel.find({day:statusOfDay.day, habit:habit});
        await dayModel.findByIdAndUpdate(habitData[0]._id,{status:statusOfDay.status});
        const habitInfo =await habitModel.find({habit:habit});
        const habitInfoWithDays= await  habitInfo[0].populate({
            path:'days',
            options: { sort: { createdAt: 1 } }
        });
        return habitInfoWithDays;
    }



}