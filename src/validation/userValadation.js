const { check } = require("express-validator/check")
const { transUser } = require("./../../lang/vi")

let userValidation = [
    check("current_password", transUser.current_password_not_empty).not().isEmpty(),
    check("password", transUser.password_not_empty).not().isEmpty(),
    check("password", transUser.password_incorect)
        .isLength({min:8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("re_password", transUser.re_password_incorect)
        .custom((value, {req}) => {
            return value === req.body.password
        })

]
module.exports = {
    userValidation: userValidation
}