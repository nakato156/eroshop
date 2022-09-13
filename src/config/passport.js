const passport = require('passport')
const {Strategy} = require('passport-local')
const {Admin} = require('../models/Admin')

passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    const admin = await Admin.Auth(username, password)
    if(!admin) return done(null, false, {message: 'Credenciales incorrectas'})
    return done(null, admin[0]); 
}));

passport.serializeUser((admin, done) => {
    done(null, admin.uuid)
})

passport.deserializeUser(async (id, done) => {
    const admin = await Admin.findById(id)
    done(null, admin[0])
})