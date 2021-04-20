const ConnectDB = require("./config/connectDB")
const initRoute = require("./routes/web")
const configViewEngine = require("./config/viewEngine")
const bodyParser = require("body-parser")
const configSession = require("./config/session")
const connectFlash = require("connect-flash")
const passport = require("passport")
    // passport thi giua flash va initroutes
    // session thi phai duoi connectDB
    // flash giua bodyparser va initroutes

const express = require('express')
const app = express()


// connect DB
ConnectDB()
    // config session
configSession(app)
    // config views engine
configViewEngine(app)
    // body-parser
app.use(bodyParser.urlencoded({ extended: true }))
    //connect flash
app.use(connectFlash())
    //passport
app.use(passport.initialize())
app.use(passport.session())
    // routes
initRoute(app)

app.listen(process.env.APP_PORT, () => {
    console.log('Server listening at port 3000')
})