const express=require('express')
const app=express()
const cors=require('cors')
const {port}=require('./config/index')


const routes=require("./apis/index")
const airfreightRoute=require("./apis/routes/airfreightRoot")
const airLine=require("./apis/routes/airLineRoot")
const truck=require("./apis/routes/truckMaster")

// body parse and initial setup

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());

app.use("/api/v1",routes)
app.use("/api/v1/airfreight",airfreightRoute)
app.use("/api/v1/airline",airLine)
app.use("/api/v1/truck",truck)



app.get("/",async(req,res,next)=>{
    return res.status(200).json({
        message:"hello form the dev server"
    })
})

app.use("*",async(req,res)=>{
    return res.status(404).json({
        message:"404 not found error"
    })
})


app.use((error,req,res,next)=>{
    return res.status(400).json({
        success:false,
        message:error&&error.message||"Something went wrong",
        result:''
    })
})

process.on("TypeError",function(err){
    console.log(err)
  
  })
  process.on('uncaughtException', (err) => {
    console.error(`Uncaught exception: ${err}`);
  });
  process.on("unhandledRejection",(err) => {
    console.error(`Uncaught exception: ${err}`);
  
  });

app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}/`)
})