const passport = require("passport")
const passportLocal = require("passport-local")
const UserModel = require("./../../models/userModels")
const { transPassport } = require("./../../../lang/vi")

let localStratery = passportLocal.Strategy

let initPassportLocal = () => {
    passport.use(new localStratery({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findByEmail(email)
            if (!user) {
                return done(null, false, req.flash("errors", transPassport.login_failed))
            }
            if (!user.local.isActive) {
                return done(null, false, req.flash("errors", transPassport.account_not_active))
            }
            let checkPassword = await user.comparePassword(password)
            if (!checkPassword) {
                return done(null, false, req.flash("errors", transPassport.login_failed))
            }
            return done(null, user, req.flash("success", transPassport.login_success(user.username)))
        } catch (error) {
            console.log(error)
            return done(null, false, res.flash("errors", transPassport.server_error))
        }
    }))

    // save user_id to session

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(user => {
                return done(null,user)
            })
            .catch(error => {
                return done(error, null)
            })
    })
}


module.exports = initPassportLocal