import app from "./index.js";
import connectToMongodb from "./src/config/mongoose.config.js";


app.listen(3100,()=>{
    console.log("Server listening on port 3100");
    connectToMongodb();
})