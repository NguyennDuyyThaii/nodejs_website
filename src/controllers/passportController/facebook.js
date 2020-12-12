const passport = require("passport")
const passportFacebook = require("passport-facebook")
const userModel = require("./../../models/userModels")
const { transPassport } = require("./../../../lang/vi")

let FacebookStratery = passportFacebook.Strategy

let fbAppId = process.env.FB_APP_ID
let fbAppSecret = process.env.FB_APP_SECRET
let fbAppCallbackUrl = process.env.FB_CALLBACK_URL

let initPassportFacebook = () => {
    passport.use(new FacebookStratery({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbAppCallbackUrl,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            // tim theo fb id xem nó có trong csdl chưa
            let user = await userModel.findByFacbookUid(profile.id)
            if (user) {
                return done(null, user, req.flash("success", transPassport.login_success(user.username)))
            }
            // nếu chưa đăng nhập lần nào thì tạo tài khoản thôi
            console.log(profile)
            let newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile._json.email // nhu nay thi k lay dc cai email
                    // email: profile.emails[0].value// lay duoc email nhưng 0 underfine
                }
            }   
            let newUser = await userModel.createNew(newUserItem)
            return done(null, newUser, req.flash("success", transPassport.login_success(newUser.username)))
        } catch (error) {
            console.log(error)
            return done(null, false,req.flash("errors", transPassport.server_error))
        }
    }))
    // Save userId to session
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

module.exports = initPassportFacebook