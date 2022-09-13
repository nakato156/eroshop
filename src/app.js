if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const morgan = require('morgan')
const passport = require("passport")

const app = express();
require('./config/passport')

// settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// rutas
const public_routes = require('./routes/route');
const admin_routes = require('./routes/admin_route')

app.use('/', public_routes)
app.use('/panel', admin_routes)

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});
