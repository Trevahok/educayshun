import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.mjs'
import mongoose from 'mongoose'
import dotenv from "dotenv";

const app = express()

// Config 
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', './views')


dotenv.config()


mongoose.connect( 
    process.env.DB_CONNECT, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    ()=>{
        console.log('Mongo db is connected')
    }
)



// Include routes 

app.use('/auth/', authRoutes)


// home routes 
app.get('/', (req, res ) => {
    res.render('home')
})


app.listen(8080)