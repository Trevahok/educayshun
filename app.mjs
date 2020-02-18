import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.mjs'
import courseRoutes from './routes/courses.mjs'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import {dirname} from "path";
import morgan from 'morgan'
import { authContextMiddleware } from './middlewares/auth.mjs'


const app = express()
dotenv.config()

// Config 

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET_KEY ,
    saveUninitialized: true,
    resave: true,
}))
app.use( express.static(path.join( dirname('.'), 'public')))
app.use( morgan('tiny') ) 


app.set('view engine', 'pug')
app.set('views', './views')


// DB connection

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

// middlewares

app.use(authContextMiddleware)


// Include routes 

app.use('/auth/', authRoutes)
app.use('/courses/', courseRoutes)


// home routes 
app.get('/', (req, res ) => {
    res.render('home')
})


app.listen(8080)