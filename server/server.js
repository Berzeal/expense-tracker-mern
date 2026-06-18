const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB=require('./config/db')
const authRoutes = require('./routes/authRoute')
const testRoutes = require('./routes/testRoutes')
const transactionRoutes= require('./routes/transactionRoutes')

dotenv.config()

const app = express()

//Connect to the Database
connectDB()

//Middleware
app.use(cors({
    origin:["http://localhost:5173","https://expense-tracker-mern-1-zc0t.onrender.com"],
    credentials:true,
}))
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/test",testRoutes)
app.use("/api/transactions",transactionRoutes)

//Test Route
app.get("/",(req,res)=>{
    res.send("Express API Running")
})
app.get("/api", (req, res) => {
  res.send("Backend Connected");
});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})