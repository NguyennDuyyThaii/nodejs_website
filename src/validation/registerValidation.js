const { check } = require("express-validator/check")
const { Registererrors } = require("../../lang/vi")
let register = [
    check("email", Registererrors.email_incorect)
        .isEmail().trim(),
    check("gender", Registererrors.gender_incorect)
        .isIn(["male", "female"]),
    check("password", Registererrors.password_incorect)
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("re_password", Registererrors.re_password_incorect)
        .custom((value, { req }) => {
            return value === req.body.password
        })

]

module.exports = {
    register: register
}