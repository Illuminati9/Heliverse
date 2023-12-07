const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const database = require('./config/database.js')

const userRoute = require('./routes/user.js')
const teamRoute = require('./routes/team.js')
const {filterData } = require('./controllers/user.js')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors())

require('dotenv').config()

app.use('/api/users',userRoute)
app.use('/api/team',teamRoute)
app.get('/api/filter',filterData)
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello world"
    })
})

database.dbConnect()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})