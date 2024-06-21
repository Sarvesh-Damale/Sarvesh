import express from "express";
import app from "./index.js";
import connectToMongodb from "./src/config/mongoose.config.js";


app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
    connectToMongodb();
})

