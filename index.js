const express=require("express");
// to make .env file available
require("dotenv").config();
const routes=require("./routes/routes")

const app=express();
const PORT=process.env.PORT||4040;

app.use("/routes", routes);
app.listen(PORT, ()=>{
    console.log("app running")
});