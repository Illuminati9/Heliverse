const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const database = require('./config/database.js')

const basicRoute = require('./routes/index.js')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors())

require('dotenv').config()

app.use('/api/users',basicRoute)
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello world"
    })
})

database.dbConnect()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})