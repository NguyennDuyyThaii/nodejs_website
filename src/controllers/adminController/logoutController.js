const {Registersuccess} = require("./../../../lang/vi")
let getLogout = (req,res) => {
    req.logout()
    req.flash("success", Registersuccess.logout_success)
    return res.redirect("/signin")
}
let checkLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/signin")
    }
    next()
}
let checkLoggedOut = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}
module.exports = {
    getLogout: getLogout,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut
}