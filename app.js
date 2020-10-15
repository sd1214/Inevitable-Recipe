const express=require("express")
const dotenv=require("dotenv")
const mongoose=require('mongoose')
const connectDB=require('./config/db')
const morgan=require('morgan')
const exphbs=require('express-handlebars')
const path=require('path')
const passport=require('passport')
const session=require('express-session')
const mongoStore=require('connect-mongo')(session)
const stripTags=require('./views/helper/hbs')
dotenv.config({path:'./config/config.env'})
require('./config/passport')(passport)
connectDB()

const app=express()

const PORT=process.env.PORT|| 5000

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}

app.engine('.hbs', exphbs({defaultLayout:'main' ,extname: '.hbs',helpers:stripTags}))
app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname,'public'))) 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,   
    store:new mongoStore({mongooseConnection:mongoose.connection})
  }))
app.use(passport.initialize())
app.use(passport.session())

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());

app.use('/',require('./routes/index')) 
app.use('/auth',require('./routes/auth'))  
app.use('/recipe',require('./routes/newrecipe'))
app.use('/recipe',require('./routes/showrecipe'))

app.listen(PORT,console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`))